export default async function (req, res) {

  // const response = await fetch(process.env.LCC_ENDPOINT_URL, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-Api-Key": process.env.LCC_TOKEN
  //   },
  //   body: JSON.stringify({
  //     question: req.body.question,
  //     history: req.body.history
  //   }),
  // });
  console.log(req.body)
  const data = {
    result: {
      success: "apiの返答メッセージ",
      error: null
    }
  }

  res.status(200).json(data)
}