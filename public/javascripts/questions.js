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

      newUpVote.setAttribute('class', 'upVote button_votes')
      newUpVote.setAttribute('data-answerid', 'answer.id')

      newDownVote.setAttribute('class', 'downVote button_votes')
      newDownVote.setAttribute('data-ansid', 'answer.id')

      newUpVote.appendChild(upvoteImg)
      newSpan.innerHTML = '0'                                                // replace this with actual count(?)
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
      const newAnsweredBy = createNewElement('p', 'class', 'answered_by')

      newAnswer.innerHTML = answer.content
      // newAnsweredBy.setAttribute('style', 'text-align: center; display: table-cell; vertical-align: middle')
      newAnsweredBy.innerHTML = 'You answered'

      newAnswerSection.appendChild(createNewVote())

      // newUpButton.setAttribute('id', 'upVote')
      // newUpButton.setAttribute('data-answerid', 'answer.id')

      // newDownButton.setAttribute('id', 'downVote')
      // newDownButton.setAttribute('data-ansid', 'answer.id')

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

  // const vote = document.querySelectorAll('.vote_on_answer')
  // const downVote = document.querySelector('#downVote')
  // console.log(vote)
  // vote.forEach( v => {
  //   v.addEventListener('submit', e => {
  //     e.preventDefault();
  //     const voteType = e.currentTarget.dataset.votetype;
  //     const answerId = e.currentTarget.dataset.answerid;

  //     console.log(`voteType ${voteType}`)
  //     console.log(`answerId ${answerId}`)

  //     e.stopImmediatePropagation()
  //   })
  // })

  let upVotes = document.querySelectorAll('button.upVote')
  let downVotes = document.querySelectorAll('button.downVote')

  console.log(upVotes)
  console.log(downVotes)

  upVotes.forEach(v => {
    v.addEventListener('click', async e => {

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
      let down = document.querySelector(`[data-id="down${answerId}"]`);
      console.log("down button ", down)
      e.stopImmediatePropagation()
    })
  })

  downVotes.forEach(v => {
    v.addEventListener('click', async e => {

      e.preventDefault();
      
      const isUpvote = false
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
      if (total == 1) {
        total = -1;
      } else {
        --total;
      }
      spanNumber.innerHTML = total

      document.querySelector(`[data-id="up${answerId}"]`).disabled = false;
      e.stopImmediatePropagation()
    })
  })

})
