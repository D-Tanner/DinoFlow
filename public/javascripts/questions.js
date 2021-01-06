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
    newAnswer.setAttribute('class', '.single_answers')
    newAnswer.innerHTML = answer.content

    answerSection += answerSection.appendChild(newAnswer)


    e.stopImmediatePropagation()


    //When we hit the submit button, make a post fetch request with new answer

    //load in the new answer

    //create a new answer div and add it in question.pug file by appending the child to class="answers_section"
  })

})
