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

function processLanguage(fileList, language, filesMaster) {
	const bundleData = {}

	filesMaster.forEach(master => {
		fileList.filter((file) => {
			const aux = file.replace("/" + language + "/", "/master/")
			return aux == master;
		}).forEach(target => {
			const data = processFile(master, target);
			for (const key in data) {
				if (!bundleData[key]) {
					bundleData[key] = data[key];
				} else {
					console.info("Duplicate key " + key + " in " + language);
				}
			}
		})
	});

	if (language == "ptb") {
		language = "pt-BR"
	}

	const bundleFile = path.join(process.cwd(), "l10n", "bundle.l10n." + language + ".json");
	fse.writeJSONSync(bundleFile, bundleData, { encoding: "utf-8" });
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
	fse.writeJSONSync(bundleFile, dataLanguage, { encoding: "utf-8" });

}

function main() {
	console.log("Start migrate data files");

	const filesMaster = getLanguageFile("master");
	const filesEsn = getLanguageFile("esn");
	const filesRus = getLanguageFile("rus");
	const filesPtb = getLanguageFile("ptb");

	processLanguage(filesEsn, "esn", filesMaster);
	processLanguage(filesRus, "rus", filesMaster);
	processLanguage(filesPtb, "ptb", filesMaster);

	verifyResult("esn");
	verifyResult("rus");
	verifyResult("pt-BR");

	console.log("End migrate data files");
}

main()