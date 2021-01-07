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


    //When we hit the submit button, make a post fetch request with new answer

    //load in the new answer

    //create a new answer div and add it in question.pug file by appending the child to class="answers_section"
  })

  const upVote = document.querySelector('#upVote')
  const downVote = document.querySelector('#downVote')

  upVote.addEventListener('click', e => {

    /*Steps 
    1.)Check if 
    1.)Create form
    2.)grab id for answers
    3.)grab the body and covert to json

    4.)Create a variable for count
    5.)Create a function to lookup Table count div to return overall count

    Notes: Table has downvotes and upvotes to be returns
    */

    //check if user is logged in
    if (local) {
      const formData = new Form

    }
    // if not--send an alert
    window.alert("Please Log In to vote")
    res.redirect('/users/login')

  })
  downVote.addEventListener('click', e => [

  ])
})
