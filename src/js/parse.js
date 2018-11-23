let lineNumber = 1;
var infoTable = [];
let flag = false;
var forBool = false;

//The main function- checks the type of the element and send to other functions
function Parsing(parseCode) {
    if (parseCode.type == 'BlockStatement')
        Parsing(parseCode.body);
    for (let i = 0; i < parseCode.length; i++) {
        const element = parseCode[i];
        checkType(element);
        if (flag == true)
            flag = false;
        if (element.alternate)
            alternateElem(element);
    }
    return infoTable;
}

// types
function checkType(element) {
    if (element.type == 'FunctionDeclaration')
        parseFunction(element);
    else if (element.type == 'VariableDeclaration')
        parseVariableDeclaration(element);
    else
        OtherTypes(element);
        
}
// types
function OtherTypes(element) {
    if (element.type == 'ExpressionStatement')
        parseExpressionStatement(element.expression);
    else if (element.type == 'IfStatement' && flag == false)
        parseIfStatement(element);
    else
        OtherTypes1(element);
}
// types
function OtherTypes1(element) {
    if (element.type == 'ReturnStatement')
        parseReturnStatement(element);
    else if (element.type == 'WhileStatement')
        parseWhileStatement(element);
    else if (element.type == 'ForStatement')
        parseForStatement(element);
}

//initialization
function clear() {
    infoTable = [];
    lineNumber = 1;
    flag = false;
    forBool = false;
}

//parsing of function element
function parseFunction(functionElement) {
    var lineTable = {};
    lineTable.Line = lineNumber;
    lineTable.Type = 'function declaration';
    lineTable.Name = functionElement.id.name;
    infoTable.push(lineTable);
    //params
    for (let index = 0; index < functionElement.params.length; index++) {
        const paramElement = functionElement.params[index];
        var lineTable1 = {};
        lineTable1.Line = lineNumber;
        lineTable1.Type = 'variable declaration';
        lineTable1.Name = paramElement.name;
        infoTable.push(lineTable1);
    }
    lineNumber++;
    Parsing(functionElement.body);
}

//parsing of variable declaration element
function parseVariableDeclaration(variableDeclarationElement) {
    for (let index = 0; index < variableDeclarationElement.declarations.length; index++) {
        const varDecElement = variableDeclarationElement.declarations[index];
        var lineTable = {};
        lineTable.Line = lineNumber;
        lineTable.Type = 'variable declaration';
        lineTable.Name = varDecElement.id.name;
        if (varDecElement.init)
            lineTable.Value = checkParentheses(parseExpressionStatementRec(varDecElement.init));
        if (!forBool)
            infoTable.push(lineTable);
    }
    if (!forBool)
        lineNumber++;
    return lineTable;
}

//parsing of expression statement
function parseExpressionStatement(expressionStatementElement) {
    var lineTable = {};
    lineTable.Line = lineNumber;
    lineTable.Type = 'assignment expression';
    if (expressionStatementElement.type == 'UpdateExpression') {
        lineTable.update = true;
        lineTable.Name = expressionStatementElement.argument.name;
        lineTable.Value = ValueEx(expressionStatementElement);
    }
    else {
        lineTable.Name = NameEx(expressionStatementElement);
        lineTable.Value = checkParentheses(parseExpressionStatementRec(expressionStatementElement.right));
    }
    if (!forBool) {
        infoTable.push(lineTable);
        lineNumber++;
    }
    return lineTable;
}
//return the name of the expression statement
function NameEx(expressionStatementElement) {
    if (expressionStatementElement.left.type == 'Identifier')
        return expressionStatementElement.left.name;
    else
        return checkParentheses(parseExpressionStatementRec(expressionStatementElement.left));
}
//return the value of the expression statement
function ValueEx(expressionStatementElement) {
    if (expressionStatementElement.prefix)
        return expressionStatementElement.operator + expressionStatementElement.argument.name;
    else
        return expressionStatementElement.argument.name + expressionStatementElement.operator;
}

//check if there is Parentheses
function checkParentheses(exRec) {
    var str = '' + exRec;
    if (str.substring(0, 1) == '(') {
        var strSub = str.substring(1, str.length - 1);
        return strSub;
    }
    return exRec;
}

//parsing of expression statement
function parseExpressionStatementRec(expressionStatementElement) {
    if (expressionStatementElement.type == 'BinaryExpression')
        return '(' + parseExpressionStatementRec(expressionStatementElement.left) + ' ' + expressionStatementElement.operator + ' ' + (parseExpressionStatementRec(expressionStatementElement.right)) + ')';
    if (expressionStatementElement.type == 'Literal')
        return expressionStatementElement.value;
    if (expressionStatementElement.type == 'Identifier')
        return expressionStatementElement.name;
    if (expressionStatementElement.type == 'MemberExpression')
        return expressionStatementElement.object.name + '[' + checkParentheses(parseExpressionStatementRec(expressionStatementElement.property)) + ']';
    return unaryAndUpdate(expressionStatementElement);
}
//parsing of expression statement2
function unaryAndUpdate(expressionStatementElement) {
    if (expressionStatementElement.type == 'UnaryExpression')
        return expressionStatementElement.operator + checkParentheses(parseExpressionStatementRec(expressionStatementElement.argument));
    // if (expressionStatementElement.type == 'UpdateExpression') {
    if (expressionStatementElement.prefix)
        return expressionStatementElement.operator + expressionStatementElement.argument.name;
    else
        return expressionStatementElement.argument.name + expressionStatementElement.operator;
}
//parsing of while statement
function parseWhileStatement(whileStatementElement) {
    var lineTable = {};
    lineTable.Line = lineNumber;
    lineTable.Type = 'while statement';
    lineTable.Condition = checkParentheses(parseExpressionStatementRec(whileStatementElement.test));
    infoTable.push(lineTable);
    lineNumber++;
    Parsing(whileStatementElement.body);
}
//parsing of if statement
function parseIfStatement(ifStatementElement) {
    var lineTable = {};
    lineTable.Line = lineNumber;
    lineTable.Type = 'if statement';
    lineTable.Condition = checkParentheses(parseExpressionStatementRec(ifStatementElement.test));
    infoTable.push(lineTable);
    lineNumber++;
    checkIfConsequent(ifStatementElement.consequent);
}
//consequent of if statement
function checkIfConsequent(element) {
    var array = [];
    array.push(element);
    Parsing(array);
}

//alternate of if statement
function alternateElem(element) {
    var lineTable = {};
    lineTable.Line = lineNumber;
    var alternateElement = JSON.parse(JSON.stringify(element.alternate));
    if (alternateElement.type == 'IfStatement') {
        lineTable.Type = 'else if statement';
        lineTable.Condition = checkParentheses(parseExpressionStatementRec(alternateElement.test));
        infoTable.push(lineTable);
        lineNumber++;
        checkIfConsequent(alternateElement.consequent);
        flag = true;
    }
    else {
        lineTable.Type = 'else statement';
        infoTable.push(lineTable);
    }
    Parsing([alternateElement]);
}
//parsing of return statement
function parseReturnStatement(returnStatementElement) {
    var lineTable = {};
    lineTable.Line = lineNumber;
    lineTable.Type = 'return statement';
    lineTable.Value = checkParentheses(parseExpressionStatementRec(returnStatementElement.argument));
    infoTable.push(lineTable);
    lineNumber++;
}
//parsing of for statement
function parseForStatement(forStatementElement) {
    forBool = true;
    var lineTable = {};
    lineTable.Line = lineNumber;
    lineTable.Type = 'for statement';
    var init = checkIfExpressionOrVariable(forStatementElement.init);
    var update = checkIfExpressionOrVariable(forStatementElement.update);
    lineTable.Condition = init + ' ; ' + checkParentheses(parseExpressionStatementRec(forStatementElement.test)) + ' ; ' + update;
    infoTable.push(lineTable);
    forBool = false;
    lineNumber++;
    Parsing(forStatementElement.body);

}
//return the value of the expression
function checkIfExpressionOrVariable(element) {
    if (element.type == 'VariableDeclaration') {
        var variable = parseVariableDeclaration(element);
        return variable.Name + ' = ' + variable.Value;
    }
    var expression = parseExpressionStatement(element);
    if (expression.update)
        return expression.Value;
    return expression.Name + ' = ' + expression.Value;
}

export { Parsing };
export { clear };
