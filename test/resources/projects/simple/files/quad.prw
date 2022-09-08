#include "protheus.ch"

/*/{Protheus.doc} TQuad
Efetua o c�lculo da �rea ou per�metro em quadril�teros.
@type    class
@version (sem restri��o)
@author  acandido 
@since   05/09/2022
/*/

class TQuad
    static method metodoEstaticoDaClasse()

    //{pdoc} Tamanho da base do quadril�tero.
	//{pdoc} @propType numeric
    private data base as numeric
	
    //{pdoc} Altura quadril�tero
	//{pdoc} @propType numeric
    private data altura as numeric
	
    //{pdoc} Tamanho da base menor, nos trap�zios.
    //{pdoc} @propType numeric
	private data baseMenor as numeric

	//ProtheusDOC de m�todos devem ser efetuados na implementa��o.
    public method new(base as numeric, altura as numeric) as object
    public method base(nValor as numeric) as numeric
    public method altura(nValor as numeric) as numeric
    public method baseMenor(nValor as numeric) as numeric

    public method area() as numeric
    public method perimetro() as numeric

endClass

/*/{Protheus.doc} TQuad::new
Cria o objeto para calcular �rea e per�metro de quadril�teros.
@type method
@author  acandido
@param base, numeric, medida da base do quadril�tero.
@param altura, numeric, medida da altura do quadril�tero.
@return object, inst�ncia do objeto ``TQuad``.
/*/
method new(nBase as numeric, nAltura as numeric) class TQuad
    ::base := nBase
	::altura := nAltura
	::baseMenor := 0
	
return self

/*/{Protheus.doc} TQuad::base
Recupera o valor atual da propriedade base. Se ``nValue`` for informado, ajusta
o valor da propriedade ``base`` para ``nValue``.
@type method
@author  acandido
@param [nValue], numeric, nova medida da base do quadril�tero se informado.
...outras marca��es ProtheusDOC...
@return numeric, base do quadril�tero.
/*/
method base(nValor as numeric) as numeric class TQuad
    if (valtype(nValor) == "N") 
		::base = nValor
	endif
return ::base

/*/{Protheus.doc} TQuad::altura
Recupera o valor atual da propriedade ``altura``. Se ``nValue`` for informado, ajusta
o valor da propriedade ``altura`` para ``nValue``.
@type method
@author  acandido
@param [nValue], numeric, nova medida da altura do quadril�tero se informado.
@return numeric, altura do quadril�tero.
/*/
method altura(nValor as numeric) as numeric class TQuad
    if (valtype(nValor) == "N") 
		::altura = nValor
	endif
return ::altura

/*/{Protheus.doc} TQuad::baseMenor
Recupera o valor atual da propriedade ``baseMenor``. Se ``nValue`` for informado, ajusta
o valor da propriedade ``baseMenor`` para ``nValue``.
@type method
@author  acandido
@param [nValue], numeric, nova medida da base menor do quadril�tero se informado.
@return numeric, base menor do quadril�tero.
/*/
method baseMenor(nValor as numeric) as numeric class TQuad
    if (valtype(nValor) == "N") 
		::baseMenor = nValor
	endif
return ::baseMenor

/*/{Protheus.doc} TQuad::area
Calcula a �rea do quadril�tero.
@type method
@author  acandido
@return numeric, �rea do quadril�tero.
/*/
method area() as numeric class TQuad
    //{pdoc} Resultado da �rea calculada.
    local nArea := -1
    
	if (::baseMenor == 0) 
		nArea := ::base * ::altura //quadrados e ret�ngulos
	else
		nArea := ((::base + ::baseMenor) * ::altura) / 2  //trap�zios
	endif
return nArea

/*/{Protheus.doc} TQuad::perimetro
Calcula o perimetro do quadril�tero (somente quadrados e ret�ngulos).
@type method
@author  acandido
@return numeric, perimetro do quadril�tero.
/*/
method perimetro() as numeric class TQuad
    //{pdoc} Resultado do perimetro calculado. -1, indica par�metro inv�lido
    local nPerimetro := -1
    
	if (::baseMenor == 0) 
		nArea := ::base * 2 + ::altura * 2//quadrados e ret�ngulos
	endif
return nPerimetro

user function tst_quad() 
    local quadrilatero := TQuad():new()
    local x

    conout(quadrilatero:perimetro())

return
