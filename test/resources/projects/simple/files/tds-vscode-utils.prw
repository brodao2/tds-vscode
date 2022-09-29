/*
https://www.universoadvpl.com/advpl-funcoes/
http://tdn.totvs.com/pages/viewpage.action?pageId=6063792

Retorna um ou mais arrays contendo os dados das fun��es contidas no RPO - Reposit�rio Port�vel de Objetos, a partir de uma m�scara.
http://tdn.totvs.com/display/tec/GetFuncArray

Retorna um array com o nome dos fontes compilados.
http://tdn.totvs.com/display/tec/GetSrcArray

Retorna um array multidimensional com todas as informa��es das propriedades da inst�ncia da classe contida no objeto informado como par�metro
http://tdn.totvs.com/display/tec/ClassDataArr

LIsta Funcoes de BIN
__funarr()
*/

#include "totvs.ch"
#include "fileio.ch"

// Recupera funcoes e tipos de parametros
user function getFunc(target)
	local nHandle, nHandle2

	conout("** TDS: running getFunctionsInfo")

	if target == nil
		target = "W:\ws_tds_vscode\tds-vscode\test\resources\projects\advpl\files"
	endif
	target = strTran( target, "/", "\")
5
	//conout("** TDS: get web document list")
	//doGetWebDoc(target)

	conout("** TDS: get functons list")
	nHandle := fcreate(target+'\funcs.txt')
	If nHandle < 0
		conout("3")
		conout('Erro de abertura : FERROR '+str(ferror(),4))
		return
	endif
	nHandle2 := fcreate(target+'\binary_functions.inc')
	If nHandle2 < 0
		conout("3")
		conout('Erro de abertura : FERROR '+str(ferror(),4))
		return
	endif
	doFunction(nHandle, nHandle2)

	fclose(nHandle)

	conout("** TDS: finished getFunctionsInfo")

return

static function doFunction(nHandle, nHandle2)
// Lista de funcoes ordenada
	local i
	local aFuncs := __funarr()
	aSort(aFuncs, , , {|x,y| lower(x[1]) < lower(y[1])})

	FWrite(nHandle2, "/*")
	FWrite(nHandle2, chr(10))
	FWrite(nHandle2, " Gerado automaticamente pelo prorama TDS-VSCode-Utils#-u_getFunc")
	FWrite(nHandle2, chr(10))
	FWrite(nHandle2, " em " + dtoc(date()) + " as " + time())
	FWrite(nHandle2, chr(10))
	FWrite(nHandle2, " Modifica��es manuais podem ser perdidas")
	FWrite(nHandle2, chr(10))
	FWrite(nHandle2, "*/")
	FWrite(nHandle2, chr(10))

	FWrite(nHandle2, "QStringList functionList;")
	FWrite(nHandle2, chr(10))
	FWrite(nHandle2, "QString line;")
	FWrite(nHandle2, chr(10))

	for i := 1 to len(aFuncs)
		FWrite(nHandle, lower(aFuncs[i,1]))
		FWrite(nHandle, ";")
		FWrite(nHandle, aFuncs[i,2])
		FWrite(nHandle, chr(10))

		FWrite(nHandle2, 'line = "";')
		FWrite(nHandle2, 'line.append("'+lower(aFuncs[i,1])+'")')
		FWrite(nHandle2, '  .append("'+";"+'")')
		FWrite(nHandle2, '  .append("'+aFuncs[i,2]+'");')
		FWrite(nHandle2, chr(10))
		FWrite(nHandle2, "functionList.append(line);")
		FWrite(nHandle2, chr(10))

	next i

return

// Converte tipos de variaveis
static function getParamType(cParam)
	retParam := cParam
	do case
	case subs(cParam, 1, 1) == "A"
		retParam := "array"
	case subs(cParam, 1, 1) == "N"
		retParam := "numeric"
	case subs(cParam, 1, 1) == "D"
		retParam := "date"
	case subs(cParam, 1, 1) == "C"
		retParam := "character"
	case subs(cParam, 1, 1) == "O"
		retParam := "object"
	case subs(cParam, 1, 1) == "B"
		retParam := "block"
	case subs(cParam, 1, 1) == "L"
		retParam := "logical"
	case subs(cParam, 1, 1) == "*"
		retParam := "any"
	case subs(cParam, 1, 1) == "J"
		retParam := "json"
	endCase
return retParam

static function doGetWebDoc(target)
	local oWebEngine
	local aHeader := {}

	aAdd(aHeader,"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0")
	aAdd(aHeader,"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8")
	aAdd(aHeader,"Accept-Language: pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3")
	aAdd(aHeader,"Accept-Encoding: deflate, br")
	aAdd(aHeader,"Connection: keep-alive")
	aAdd(aHeader,"Referer: https://tdn.totvs.com/display/tecen/AdvPL+Functions")
	aAdd(aHeader,"Cookie: _ga=GA1.2.800609239.1663596109; _ga_8RWQ11H2P1=GS1.1.1664186489.6.1.1664187932.0.0.0; __insp_wid=96774380; __insp_slim=1663833818427; __insp_nv=true; __insp_targlpu=aHR0cHM6Ly9jZW50cmFsZGVhdGVuZGltZW50by50b3R2cy5jb20vaGMvcHQtYnIvYXJ0aWNsZXMvMzYwMDI2MDY5MzUxLUNyb3NzLVNlZ21lbnRvcy1UT1RWUy1CYWNrb2ZmaWNlLUxpbmhhLVByb3RoZXVzLUFEVlBMLURpZmVyZW50ZXMtdGlwb3MtcHJpbWl0aXZvcy1jb20tdGlwYWdlbS1mb3J0ZQ%3D%3D; __insp_targlpt=Q3Jvc3MgU2VnbWVudG9zIC0gVE9UVlMgQmFja29mZmljZSAoTGluaGEgUHJvdGhldXMpIC0gQURWUEwgLSBEaWZlcmVudGVzIHRpcG9zIHByaW1pdGl2b3MgY29tIHRpcGFnZW0gZm9ydGUg4oCTIENlbnRyYWwgZGUgQXRlbmRpbWVudG8gVE9UVlM%3D; __insp_norec_sess=true; __zlcmid=1C5lFGuQRqgJVaW; JSESSIONID=445CAEDE6B72ABC9ACD8C03C2CD28592; _gid=GA1.2.1273036373.1664186490; _gat=1")
	aAdd(aHeader,"Upgrade-Insecure-Requests: 1")
	aAdd(aHeader,"Sec-Fetch-Dest: document")
	aAdd(aHeader,"Sec-Fetch-Mode: navigate")
	aAdd(aHeader,"Sec-Fetch-Site: same-origin")
	aAdd(aHeader,"Sec-Fetch-User: ?1")
	aAdd(aHeader,"TE: trailers")

	local cHtml := HttpGet("https://tdn.totvs.com/display/tecen/AdvPL+Functions", nil, nil, aHeader)
	local nHandle := fcreate(target+'\advPL_Functions.txt')
	If nHandle < 0
		conout("3")
		conout('Erro de abertura : FERROR '+str(ferror(),4))
		return
	endif

	FWrite(nHandle, cHtml)

	FCLose(nHandle)

	oDlg := TWindow():New(0, 0, 800, 600, "WebComponent in AdvPL")
	// WebEngine (chromium embedded)
	oWebEngine := TWebEngine():New(oDlg,0,0,500,500,cHtml)
	oWebEngine:Align := CONTROL_ALIGN_ALLCLIENT

	oDlg:Activate("MAXIMIZED")
return

// Funcao customizada que sera disparada apos o termino da carga da pagina
static function myLoadFinish(oWebEngine, url)
	conout("-> myLoadFinish(): Termino da carga da pagina")
	conout("-> Class: " + GetClassName(oWebEngine))
	conout("-> URL: " + url)
	conout("-> TempDir: " + oNiverComp::tmp)
	conout("-> Websocket port: " + cValToChar(oWebChannel:nPort))

	// Executa um runJavaScript
	oWebEngine:runJavaScript("alert('RunJavaScript: Termino da carga da pagina');")
return




user function extractTLPPIncs()
	Local lRet := .F.
	Local cRet := ""
	Local aMessages := {}
	Local nI := 0

	ConOut("Getting TLPP includes ...")
	lRet := tlpp.environment.getIncludesTLPP(@cRet, @aMessages)

	If(lRet != .T.)
		ConOut("Error: " + cValToChar(cRet))
		For nI := 1 to Len(aMessages)
			ConOut(cValToChar(nI) + " Error: " + cValToChar(aMessages[nI]))
		Next
	Else
		ConOut("OK. 'includes' extracted on path: " + cValToChar(cRet))
	EndIf
Return lRet
