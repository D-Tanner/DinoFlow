window.addEventListener("load", (event) => {
  const form = document.querySelector("#answer_to_question")

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form)
    const content = formData.get("answer")
    const questionId = formData.get("questionId")
    const body = { content, questionId }

    console.log(formData)

    const response = await fetch(`http://localhost:8000/question/${questionId}/answers`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const answer = await response.json()
    let answerSection = document.querySelector(".answers_section")
    let newAnswer = document.createElement('div')
    let newVote = document.createElement('div')

    newAnswer.setAttribute('class', 'single_answers')
    newVote.setAttribute('class', 'votes')

    newAnswer.innerHTML = answer.content
    newVote.innerHTML = 'Votes'

    // answerSection += answerSection.appendChild(newAnswer)
    answerSection.appendChild(newVote)
    answerSection.appendChild(newAnswer)


    e.stopImmediatePropagation()
  })

  const upVote = document.querySelector('#upVote')
  const downVote = document.querySelector('#downVote')

  upVote.addEventListener('click', async e => {
    e.preventDefault();
    const isUpvote = true
    const body = { isUpvote }

    const answerId = e.currentTarget.dataset.answerid
    console.log(e.currentTarget)
    e.currentTarget.disabled = true;

    const response = await fetch(`http://localhost:8000/answers/${answerId}/votes`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json()

    if (result.sameVote) return

    let spanNumber = document.querySelector('.vote_count')
    let total = parseInt(spanNumber.innerHTML)
    if (total == -1) {
      total = 1;
    } else {
      ++total;
    }
    spanNumber.innerHTML = total
    document.querySelector(`[data-ansid="${answerId}"]`).disabled = false;
    e.stopImmediatePropagation()
  })

  downVote.addEventListener('click', async e => {
    e.preventDefault();
    const isUpvote = false
    const body = { isUpvote }

    const answerId = e.currentTarget.dataset.ansid
    console.log(e.currentTarget)
    e.currentTarget.disabled = true;
    const response = await fetch(`http://localhost:8000/answers/${answerId}/votes`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json()

    if (result.sameVote) return

    let spanNumber = document.querySelector('.vote_count')
    let total = parseInt(spanNumber.innerHTML)
    if (total == 1) {
      total = -1;
    } else {
      --total;
    }
    spanNumber.innerHTML = total

    document.querySelector(`[data-answerid="${answerId}"]`).disabled = false;
    e.stopImmediatePropagation()
  })
})

