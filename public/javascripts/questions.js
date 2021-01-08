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
    const formData = new FormData(form)
    const isUpvote = true
    const body = { isUpvote }

    const answerId = e.currentTarget.dataset.answerid
    console.log(e.currentTarget)
    const response = await fetch(`http://localhost:8000/answers/${answerId}/votes`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json()

    const trueBoolean = result.isUpvote

    if (trueBoolean) {
      //if it goes there reflect change on count
      let spanNumber = document.querySelector('.vote_count')
      const total = parseInt(spanNumber.innerHTML) + 1
      spanNumber.innerHTML = total
    }
    e.stopImmediatePropagation()
  })
  downVote.addEventListener('click', async e => {
    e.preventDefault();
    const formData = new FormData(form)
    const isUpvote = false
    const body = { isUpvote }

    const answerId = e.currentTarget.dataset.ansid
    console.log(e.currentTarget)
    const response = await fetch(`http://localhost:8000/answers/${answerId}/votes`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json()

    //TODO Change the Vote Model to check if the user/answer validation id exists so there polymorphic voting
    const falseBoolean = result.isUpvote

    if (!falseBoolean) {
      //if it goes there reflect change on count
      let spanNumber = document.querySelector('.vote_count')
      const total = parseInt(spanNumber.innerHTML) - 1
      spanNumber.innerHTML = total
    }
    e.stopImmediatePropagation()
  })
})

