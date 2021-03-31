window.addEventListener("load", (event) => {

  //------------------------Answer Event-----------------------------//
  const form = document.querySelector("#answer_to_question")
  const yourAnswerHeader = document.querySelector('#yourAnswerHeader')
  const newErrorContainer = document.createElement('div')
  const errorMessage = document.createElement('p')
  errorMessage.innerHTML = ''
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form)
      const content = formData.get("answer")
      const questionId = formData.get("questionId")
      const body = { content, questionId }

      const response = await fetch(`/question/${questionId}/answers`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        }
      })

      const answer = await response.json()

      if (content) {
        let answersContainer = document.querySelector(".answers_container")

        const newAnswer = createNewElement('div', 'class', 'single_answers')
        const newAnswerContainer = createNewElement('div', 'class', 'single_answers_container')
        const newAnswerSection = createNewElement('div', 'class', 'answers_section')
        const newAnsweredBy = createNewElement('p', 'class', 'answered_by')

        newAnswer.innerHTML = answer.content

        newAnsweredBy.innerHTML = 'You answered'

        newAnswerSection.appendChild(createNewVote(answer.id))

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
    })
  }
  //------------------------Vote Events-----------------------------//
  let upVotes = document.querySelectorAll('button.upVote')
  let downVotes = document.querySelectorAll('button.downVote')

  upVotes.forEach(uv => {
    upVoteAddEvent(uv);
  })
  downVotes.forEach(uv => {
    downVoteAddEvent(uv);
  })

})

//------------------------util-functions-----------------------------//
const createNewElement = (ele, attributeType, attribute) => {
  const newEle = document.createElement(ele)
  newEle.setAttribute(attributeType, attribute)
  return newEle
}


const createNewVote = (answerId) => {
  //element creation
  const newVoteDiv = createNewElement('div', 'class', 'votes')
  const newUpVote = createNewElement('button', 'class', 'button_votes')
  const upvoteImg = createNewElement('img', 'class', 'resize')
  const newSpan = createNewElement('span', 'class', 'vote_count')
  const newDownVote = createNewElement('button', 'class', 'button_votes')
  const downvoteImg = createNewElement('img', 'class', 'resize')

  //attributes setup
  newUpVote.setAttribute('class', 'upVote button_votes')
  newUpVote.setAttribute('data-answerid', `${answerId}`)
  newUpVote.setAttribute('data-id', `${answerId}up`)
  upvoteImg.setAttribute('src', '../triangular-filled-up-arrow.png')

  newSpan.setAttribute('data-id', `${answerId}span`)
  newSpan.innerHTML = '0'

  newDownVote.setAttribute('class', 'downVote button_votes')
  newDownVote.setAttribute('data-answerid', `${answerId}`)
  newDownVote.setAttribute('data-id', `${answerId}down`)
  downvoteImg.setAttribute('src', '../down-filled-triangular-arrow.png')

  //appending children
  newUpVote.appendChild(upvoteImg)

  newDownVote.appendChild(downvoteImg)

  newVoteDiv.appendChild(newUpVote)
  newVoteDiv.appendChild(newSpan)
  newVoteDiv.appendChild(newDownVote)

  //adding event listeners
  upVoteAddEvent(newUpVote)
  downVoteAddEvent(newDownVote)

  return newVoteDiv
}

//------------------------Vote Event functions-----------------------------//

function upVoteAddEvent(vote) {
  //adding event listener to vote
  vote.addEventListener('click', async e => {
    e.preventDefault();
    //setup for body of message
    const isUpvote = true
    const body = { isUpvote }
    //aquiring data-answerid from button as well as disabling it
    const answerId = e.currentTarget.dataset.answerid
    // setting vote element to variable
    const currVote = e.currentTarget
    currVote.setAttribute('voted', true)
    //fetching votes request and saving it to response variable
    const response = await fetch(`/answers/${answerId}/votes`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    });
    //parsing response into result varialble
    const result = await response.json()
    
    //checking if voter has already voted
    if (result.response.sameVote) {
      currVote.setAttribute('voted', false);
      let spanNumber = document.querySelector(`[data-id="${answerId}span"]`)
      spanNumber.innerHTML = result.voteCount
      return;
    }
    //acquiring span that displays vote data and sets innerhtml
    let spanNumber = document.querySelector(`[data-id="${answerId}span"]`)
    spanNumber.innerHTML = result.voteCount
    //enables down button
    document.querySelector(`[data-id="${answerId}down"]`).setAttribute('voted', false ) ;

    e.stopImmediatePropagation()
  })
}

function downVoteAddEvent(vote) {
  //adding event listener to vote
  vote.addEventListener('click', async e => {
    e.preventDefault();
    //setup for body of message
    const isUpvote = false
    const body = { isUpvote }
    //aquiring data-answerid from button as well as disabling it
    const answerId = e.currentTarget.dataset.answerid
    // setting vote element to variable
    const currVote = e.currentTarget
    currVote.setAttribute('voted', true)
    //fetching votes request and saving it to response variable
    const response = await fetch(`/answers/${answerId}/votes`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      }
    });
    //parsing response into result varialble
    const result = await response.json()
    
    //checking if voter has already voted
    if (result.response.sameVote) {
      currVote.setAttribute('voted', false);
      let spanNumber = document.querySelector(`[data-id="${answerId}span"]`)
      spanNumber.innerHTML = result.voteCount
      return;
    }
    //acquiring span that displays vote data and sets innerhtml
    let spanNumber = document.querySelector(`[data-id="${answerId}span"]`)
    spanNumber.innerHTML = result.voteCount
    //enables down button
    document.querySelector(`[data-id="${answerId}up"]`).setAttribute('voted', false);

    e.stopImmediatePropagation()
  })
}
