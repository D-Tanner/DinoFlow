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



    // 1. don't add a new vote/answer if we dont fill out the form
    // 2. render errors, if any
    //    a. lines 22-34 will only happen when we correctly fill out form, else
    //    b. replicate lines 22-34 for an error element
    // 3. make new div .answers_container to hold answers_section (up/down buttons as well), append to that new div



    //When we hit the submit button, make a post fetch request with new answer

    //load in the new answer

    //create a new answer div and add it in question.pug file by appending the child to class="answers_section"
  })

})
