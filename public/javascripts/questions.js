window.addEventListener("load", (event) => {
  const form = document.querySelector("#answer_to_question")
  const yourAnswerHeader = document.querySelector('#yourAnswerHeader')
  const newErrorContainer = document.createElement('div')
  const errorMessage = document.createElement('p')
  errorMessage.innerHTML = ''

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form)
    const content = formData.get("answer")
    const questionId = formData.get("questionId")
    const body = { content, questionId }

    // console.log(formData)

    const response = await fetch(`http://localhost:8000/question/${questionId}/answers`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const answer = await response.json()

    if (content) {
      let answersContainer = document.querySelector(".answers_container")
      let newAnswerSection = document.createElement('div')
      let newAnswer = document.createElement('div')
      let newVote = document.createElement('div')
      let newUpButton = document.createElement('button')
      let newDownButton = document.createElement('button')
      let newUpImg = document.createElement('img')
      let newDownImg = document.createElement('img')
      let newVoteCount = document.createElement('span')

      newAnswerSection.setAttribute('class', 'answers_section')
      newAnswer.setAttribute('class', 'single_answers')
      newVote.setAttribute('class', 'votes')

      newUpButton.setAttribute('class', 'button_votes')
      newUpButton.setAttribute('id', 'upVote')
      newUpButton.setAttribute('data-answerid', 'answer.id')

      newDownButton.setAttribute('id', 'downVote')
      newDownButton.setAttribute('data-ansid', 'answer.id')
      newDownButton.setAttribute('class', 'button_votes')

      newUpImg.setAttribute('src', '../triangular-filled-up-arrow.png')
      newUpImg.setAttribute('class', 'resize')
      newDownImg.setAttribute('src', '../down-filled-triangular-arrow.png')
      newDownImg.setAttribute('class', 'resize')

      newAnswer.innerHTML = answer.content
      newVoteCount.innerHTML = 'Votes'

      newAnswerSection.appendChild(newVote)
      newAnswerSection.appendChild(newAnswer)
      answersContainer.appendChild(newAnswerSection)
      newVote.appendChild(newUpButton)
      newUpButton.appendChild(newUpImg)
      newVote.appendChild(newVoteCount)
      newVote.appendChild(newDownButton)
      newDownButton.appendChild(newDownImg)

      errorMessage.innerHTML = ''
      form.reset()

    }


    if (!content && errorMessage.innerHTML === '') {

      newErrorContainer.setAttribute('class', 'error_container')
      errorMessage.setAttribute('class', 'error_message');

      errorMessage.innerHTML = 'Cannot submit an answer without content'

      yourAnswerHeader.appendChild(newErrorContainer)
      newErrorContainer.appendChild(errorMessage)
    }


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
