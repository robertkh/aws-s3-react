//?
import Path from "path";
import Fs from "fs";
import { yl, gl, rl } from "../../../util/logger.js";

// todo
export default async (req, res, next) => {
	yl.log(req.body);
	gl.log(req.session.user);

	//
	let oldpath = Path.join(
		Path.resolve(),
		"client/public/images",
		req.session.user.id + "_" + req.body.oldname
	);

	//
	let newpath = Path.join(
		Path.resolve(),
		"client/public/images",
		req.session.user.id + "_" + req.body.newname
	);

	//
	if (!req.session.user) {
		return res
			.status(400)
			.json("Դուք չունեք իրավասություն նշված գործողության համար։");
	}

	//
	try {
		await Fs.promises.access(oldpath);
		await Fs.promises.rename(oldpath, newpath);
		res.status(200).json("Ֆայլը հաջողությամբ վերանվանվեց։");
		gl.log("yes");
	} catch {
		res.status(400).json("Նշված ֆայլը գոյություն չունի։");
		rl.log("no");
	}
};
