

function UserQuizList({userQuiz, setUserQuiz}) {

  if (userQuiz.length) return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-10">
      {userQuiz.map((quiz, index) => {
        const { title, createdAt } = quiz
        const dateObj = new Date(createdAt);
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'UTC'
        };

        const readableDate = dateObj.toLocaleDateString('en-US', options)

        return (
          <div key={index} className="container drop-shadow-xl shadow-xl bg-blue-100 px-2 py-2 rounded-xl hover:-translate-y-2 transition-all duration-100 overflow-hidden max-w-[300px] mx-auto">
            <div className="text-lg font-semibold mb-4">
              <p>
                {title}
              </p>
            </div>
            <div>
              <p className="opacity-75 text-sm">
                date created:
              </p>
              <p className="text-sm">
                {readableDate}
              </p>
            </div>
          </div>
        )

      })}
    </div>
  )

  else return (
    <br/>
  )
}

export default UserQuizList