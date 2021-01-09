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



    //------------------------util-functions-----------------------------//
    const createNewElement = (ele, attributeType, attribute) => {
      const newEle = document.createElement(ele)
      newEle.setAttribute(attributeType, attribute)
      return newEle
    }


    const createNewVote = () => {
      const newVoteDiv = createNewElement('div', 'class', 'votes')

      const newUpVote = createNewElement('button', 'class', 'button_votes')
      const upvoteImg = createNewElement('img', 'class', 'resize')
      upvoteImg.setAttribute('src', '../triangular-filled-up-arrow.png')

      const newSpan = createNewElement('span', 'class', 'vote_count')

      const newDownVote = createNewElement('button', 'class', 'button_votes')
      const downvoteImg = createNewElement('img', 'class', 'resize')
      downvoteImg.setAttribute('src', '../down-filled-triangular-arrow.png')

      newUpVote.appendChild(upvoteImg)
      newSpan.innerHTML = 'Votes'                                                 // replace this with actual count(?)
      newDownVote.appendChild(downvoteImg)

      newVoteDiv.appendChild(newUpVote)
      newVoteDiv.appendChild(newSpan)
      newVoteDiv.appendChild(newDownVote)

      return newVoteDiv
    }
    //-------------------------------------------------------------------------//



    if (content) {
      let answersContainer = document.querySelector(".answers_container")
      const newAnswer = createNewElement('div', 'class', 'single_answers')
      const newAnswerContainer = createNewElement('div', 'class', 'single_answers_container')
      const newAnswerSection = createNewElement('div', 'class', 'answers_section')
      const newAnsweredBy = createNewElement('p', 'class', 'user_info')

      newAnswer.innerHTML = answer.content
      newAnsweredBy.setAttribute('style', 'text-align: right')
      newAnsweredBy.innerHTML = 'You answered'

      newAnswerSection.appendChild(createNewVote())
      newAnswerContainer.appendChild(newAnswer)
      newAnswerContainer.appendChild(newAnsweredBy)
      answersContainer.appendChild(newAnswerSection)
      newAnswerSection.appendChild(newAnswerContainer)

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

    //When we hit the submit button, make a post fetch request with new answer

    //load in the new answer

    //create a new answer div and add it in question.pug file by appending the child to class="answers_section"
  })

})
