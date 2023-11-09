const glob = require("glob");
const fse = require("fs-extra");
const path = require("path")

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
	console.log(master);
	console.log(target);
	const dataResult = {};
	const dataMaster = fse.readJSONSync(master);
	const dataTarget = fse.readJSONSync(target);

	for (const key in dataMaster) {
		if (dataTarget[key]) {
			dataResult[dataMaster[key]] = dataMaster[key];
		}
	}

	return dataResult;
}

function main() {
	console.log("Start migrate data files");

	const filesMaster = getLanguageFile("master");
	const filesEsn = getLanguageFile("esn");
	const filesRus = getLanguageFile("rus");
	const filesPtb = getLanguageFile("ptb");

	filesMaster.forEach(master => {
		filesEsn.filter((file) => {
			const aux = file.replace("/esn/", "/master/")
			return aux == master;
		}).forEach(target => {
			const data = processFile(master, target);
			const bundleFile = path(process.cwd, "l10n", "bundle.l10n.esn.json");
			fse.writeJSONSync(bundleFile, data);
		})

		filesRus.filter((file) => {
			const aux = file.replace("/rus/", "/master/")
			return aux == master;
		}).forEach(target => {
			const data = processFile(master, target);
			const bundleFile = path(process.cwd, "l10n", "bundle.l10n.rus.json");
			fse.writeJSONSync(bundleFile, data);
		})

		filesPtb.filter((file) => {
			const aux = file.replace("/ptb/", "/master/")
			return aux == master;
		}).forEach(target => {
			const data = processFile(master, target);
			const bundleFile = path(process.cwd, "l10n", "bundle.l10n.pt-BR.json");
			fse.writeJSONSync(bundleFile, data);
		})

	});

	console.log("End migrate data files");
}

main()