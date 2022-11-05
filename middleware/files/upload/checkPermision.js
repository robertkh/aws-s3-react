//?
import { rl } from "../../../util/logger.js";

// todo
export default (req, res, next) => {
	rl.log(req.session.user);
	//
	if (!req.session.user) {
		rl.log(req.session.user);
		return res
			.status(400)
			.json(
				"Տվյալ գործողությունը արտոնված է միայն համակարգ մուտք գործած օգտատերերին։"
			);
	}

	//
	next();
};
