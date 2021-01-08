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
