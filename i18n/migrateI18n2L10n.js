const glob = require("glob");
const fse = require("fs-extra");
const path = require("path")
const JSON5 = require('json5');
const { log } = require("console");
const { verify } = require("crypto");

function getLanguageFile(language) {
	const result = [];
	const files = glob.sync("**/" + language + "/**/*.json", {
		cwd: path.join(process.cwd(), "i18n"),
		absolute: true,
	});

	for (const file of files) {
		result.push(file);
	}

	return result;
}

function processFile(master, target) {
	console.log("Processing " + target);
	var dataResult = {};
	var contentMaster;
	var contentTarget;
	var dataMaster;
	var dataTarget;

	try {
		contentMaster = fse.readFileSync(master, { encoding: "utf-8" });
		contentTarget = fse.readFileSync(target, { encoding: "utf-8" });
		dataMaster = JSON5.parse(contentMaster);
		dataTarget = JSON5.parse(contentTarget);
	} catch (error) {
		contentMaster = fse.readFileSync(master, { encoding: "ascii" });
		contentTarget = fse.readFileSync(target, { encoding: "ascii" });
		dataMaster = JSON5.parse(contentMaster);
		dataTarget = JSON5.parse(contentTarget);
	}

	for (const key in dataMaster) {
		if (dataTarget[key]) {
			dataResult[dataMaster[key]] = dataTarget[key];
		}
	}

	return dataResult;
}

function bundleI18n(language) {
	const filesMaster = getLanguageFile(language);
	var dataResult = {};

	filesMaster.forEach((file) => {
		var contentFile;
		var dataFile;

		try {
			contentFile = fse.readFileSync(file, { encoding: "utf-8" });
		} catch (error) {
			contentFile = fse.readFileSync(file, { encoding: "ascii" });
		}
		dataFile = JSON5.parse(contentFile);

		for (const key in dataFile) {
			if (!dataResult[key]) {
				dataResult[key] = dataFile[key];
			} else if (dataResult[key] !== dataFile[key]) {
				console.info("> Duplicate Key %s [%s] file %s", key, language, file);
				console.info("  Result: %s", dataResult[key]);
				console.info("  File  : %s", dataFile[key]);
				dataResult[key] = dataFile[key];
			}
		}
	})

	return dataResult;
}

function processLanguage(language) {
	const bundleMaster = bundleI18n("master");
	const bundleLanguage = bundleI18n(language);
	var dataResult = {}

	for (const key in bundleMaster) {
		if (bundleLanguage[key]) {
			dataResult[bundleMaster[key]] = bundleLanguage[key];
		} else {
			dataResult[bundleMaster[key]] = bundleMaster[key];
		}
	}

	if (language == "ptb") {
		language = "pt-BR"
	}

	const bundleFile = path.join(process.cwd(), "l10n", "bundle.l10n." + language + ".json");
	fse.writeJSONSync(bundleFile, dataResult, { encoding: "utf-8", spaces: "  " });
}

function verifyResult(language) {
	const master = path.join(process.cwd(), "l10n", "bundle.l10n.json")
	const contentMaster = fse.readFileSync(master, { encoding: "utf-8" });
	const bundleLanguage = path.join(process.cwd(), "l10n", "bundle.l10n." + language + ".json")
	const contentLanguage = fse.readFileSync(bundleLanguage, { encoding: "utf-8" });
	const dataMaster = JSON5.parse(contentMaster);
	const dataLanguage = JSON5.parse(contentLanguage);

	for (const key in dataMaster) {
		if (!dataLanguage[key]) {
			console.info(key + " not in " + language);
			dataLanguage[key] = dataMaster[key];
		}
	};

	for (const key in dataLanguage) {
		if (!dataMaster[key]) {
			console.info(key + " not in MASTER");
		}
	};

	const bundleFile = path.join(process.cwd(), "l10n", "bundle.l10n." + language + ".full.json");
	fse.writeJSONSync(bundleFile, dataLanguage, { encoding: "utf-8", spaces: "  " });

}

function main() {
	console.log("Start migrate data files");

	processLanguage("esn");
	processLanguage("rus");
	processLanguage("ptb");

	verifyResult("esn");
	verifyResult("rus");
	verifyResult("pt-BR");

	console.log("End migrate data files");
}

main()