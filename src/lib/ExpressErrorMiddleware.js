module.exports = (err, req, res, next) => {
	console.log("Unhandled Exception", err)
	const errJson = { errors:
    { entity: ["Unhandled exception occurred."]}
  }
	res.status(500).send(errJson)
}