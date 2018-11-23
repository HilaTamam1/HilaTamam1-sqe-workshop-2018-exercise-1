import assert from 'assert';
import { parseCode } from '../src/js/code-analyzer';
import { Parsing } from '../src/js/parse';
import { clear } from '../src/js/parse';


describe('function declaration', () => {
    var elementTest = {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "binarySearch"
                },
                "params": [
                    {
                        "type": "Identifier",
                        "name": "X"
                    },
                    {
                        "type": "Identifier",
                        "name": "V"
                    },
                    {
                        "type": "Identifier",
                        "name": "n"
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                },
                "generator": false,
                "expression": false,
                "async": false
            }
        ],
        "sourceType": "script"
    }
    var infoTable = Parsing(elementTest.body);
    it('Type', () => {
        assert.equal(infoTable[0].Type, 'function declaration');
    });
    it('Name', () => {
        assert.equal(infoTable[0].Name, 'binarySearch');
    });
    it('Number of the line', () => {
        assert.equal(infoTable[0].Line, '1');
    });
});

describe('Params Function', () => {
    clear();
    var elementTest = {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "binarySearch"
                },
                "params": [
                    {
                        "type": "Identifier",
                        "name": "X"
                    },
                    {
                        "type": "Identifier",
                        "name": "V"
                    },
                    {
                        "type": "Identifier",
                        "name": "n"
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": []
                },
                "generator": false,
                "expression": false,
                "async": false
            }
        ],
        "sourceType": "script"
    }
    var infoTable = Parsing(elementTest.body);
    it('variable declaration type', () => {
        assert.equal(infoTable[1].Type, 'variable declaration');
    });
    it('function declaration name name', () => {
        assert.equal(infoTable[1].Name, 'X');
    });
    it('function declaration Line', () => {
        assert.equal(infoTable[1].Line, '1');

    });
});

describe('variable declaration', () => {
    clear();
    var elementTest = {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "low"
                        },
                        "init": null
                    },
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "high"
                        },
                        "init": null
                    },
                    {
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "mid"
                        },
                        "init": null
                    }
                ],
                "kind": "let"
            },
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "low"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
                    }
                }
            },
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "high"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "-",
                        "left": {
                            "type": "Identifier",
                            "name": "n"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }
            }
        ],
        "sourceType": "script"
    }
    var infoTable = Parsing(elementTest.body);
    it('variable declaration type', () => {
        assert.equal(infoTable[0].Type, 'variable declaration');
    });
    it('variable declaration Name', () => {
        assert.equal(infoTable[0].Name, 'low');
    });
    it('variable declaration Line', () => {
        assert.equal(infoTable[0].Line, 1);
    });
});

describe('let', () => {
    clear();
    var elementTest = parseCode('let a = 1;');
    var infoTable = Parsing(elementTest.body);
    it('let type', () => {
        assert.equal(infoTable[0].Type, 'variable declaration');
    });
    it('let Name', () => {
        assert.equal(infoTable[0].Name, 'a');
    });
    it('let Value', () => {
        assert.equal(infoTable[0].Value, '1');
    });
});

describe('Expression Statement', () => {
    clear();
    var elementTest = {
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "low"
                    },
                    "right": {
                        "type": "Literal",
                        "value": 0,
                        "raw": "0"
                    }
                }
            },
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "high"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "-",
                        "left": {
                            "type": "Identifier",
                            "name": "n"
                        },
                        "right": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        }
                    }
                }
            },
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "mid"
                    },
                    "right": {
                        "type": "BinaryExpression",
                        "operator": "/",
                        "left": {
                            "type": "BinaryExpression",
                            "operator": "+",
                            "left": {
                                "type": "Identifier",
                                "name": "low"
                            },
                            "right": {
                                "type": "Identifier",
                                "name": "high"
                            }
                        },
                        "right": {
                            "type": "Literal",
                            "value": 2,
                            "raw": "2"
                        }
                    }
                }
            }
        ],
        "sourceType": "script"
    }
    var infoTable = Parsing(elementTest.body);
    it('expression statement type', () => {
        assert.equal(infoTable[0].Type, 'assignment expression');
    });
    it('expression statement Name', () => {
        assert.equal(infoTable[1].Name, 'high');
    });
    it('expression statement Line', () => {
        assert.equal(infoTable[2].Line, 3);
    });
    it('expression statement Value', () => {
        assert.equal(infoTable[2].Value, '(low + high) / 2');
    });
    it('expression statement Condition', () => {
        assert.equal(infoTable[2].Condition, undefined);
    });
});

describe('While Statement', () => {
    clear();
    var elementTest = {
        "type": "Program",
        "body": [
            {
                "type": "WhileStatement",
                "test": {
                    "type": "BinaryExpression",
                    "operator": "<=",
                    "left": {
                        "type": "Identifier",
                        "name": "low"
                    },
                    "right": {
                        "type": "Identifier",
                        "name": "high"
                    }
                },
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
            }
        ],
        "sourceType": "script"
    }
    var infoTable = Parsing(elementTest.body);
    it('while statement type', () => {
        assert.equal(infoTable[0].Type, 'while statement');
    });
    it('while statement Name', () => {
        assert.equal(infoTable[0].Name, undefined);
    });
    it('while statement Line', () => {
        assert.equal(infoTable[0].Line, 1);
    });
    it('while statement Value', () => {
        assert.equal(infoTable[0].Value, undefined);
    });
    it('while statement Condition', () => {
        assert.equal(infoTable[0].Condition, 'low <= high');
    });
});

describe('MemberExpression, UnaryExpression', () => {
    clear();
    var elementTest = {
        "type": "Program",
        "body": [
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "high"
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 1,
                            "raw": "1"
                        },
                        "prefix": true
                    }
                }
            },
            {
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "Identifier",
                        "name": "X"
                    },
                    "right": {
                        "type": "MemberExpression",
                        "computed": true,
                        "object": {
                            "type": "Identifier",
                            "name": "V"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "mid"
                        }
                    }
                }
            }
        ],
        "sourceType": "script"
    }
    var infoTable = Parsing(elementTest.body);
    it('MemberExpression type', () => {
        assert.equal(infoTable[0].Type, 'assignment expression');
    });
    it('MemberExpression Name', () => {
        assert.equal(infoTable[0].Name, 'high');
    });
    it('MemberExpression Value', () => {
        assert.equal(infoTable[0].Value, '-1');
    });
    it('MemberExpression Condition', () => {
        assert.equal(infoTable[0].Condition, undefined);
    });
    it('UnaryExpression Line', () => {
        assert.equal(infoTable[1].Line, '2');
    });
    it('UnaryExpression Value', () => {
        assert.equal(infoTable[1].Value, 'V[mid]');
    });

});
describe('Update Expression', () => {
    clear();
    var elementTest = parseCode('a++;++a;a--;--a;');
    var infoTable = Parsing(elementTest.body);
    it('Update Expression type', () => {
        assert.equal(infoTable[0].Type, 'assignment expression');
    });
    it('Update Expression Name', () => {
        assert.equal(infoTable[0].Name, 'a');
    });
    it('Update Expression Value', () => {
        assert.equal(infoTable[0].Value, 'a++');
    });
    it('Update Expression Value', () => {
        assert.equal(infoTable[1].Value, '++a');
    });
    it('Update Expression Value', () => {
        assert.equal(infoTable[2].Value, 'a--');
    });
    it('Update Expression Value', () => {
        assert.equal(infoTable[3].Value, '--a');
    });
});
describe('Return Statement', () => {
    clear();
    var elementTest = {
        "type": "Program",
        "body": [
            {
                "type": "FunctionDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "binarySearch"
                },
                "params": [
                    {
                        "type": "Identifier",
                        "name": "X"
                    }
                ],
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ReturnStatement",
                            "argument": {
                                "type": "UnaryExpression",
                                "operator": "-",
                                "argument": {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                },
                                "prefix": true
                            }
                        }
                    ]
                },
                "generator": false,
                "expression": false,
                "async": false
            }
        ],
        "sourceType": "script"
    }
    var infoTable = Parsing(elementTest.body);
    it('return statement type', () => {
        assert.equal(infoTable[2].Type, 'return statement');
    });
    it('return statement Name', () => {
        assert.equal(infoTable[2].Name, undefined);
    });
    it('return statement Line', () => {
        assert.equal(infoTable[2].Line, '2');
    });
    it('return statement Value', () => {
        assert.equal(infoTable[2].Value, '-1');
    });
    it('return statement Condition', () => {
        assert.equal(infoTable[2].Condition, undefined);
    });
});

describe('if Statement', () => {
    clear();
    var elementTest = {
        "type": "Program",
        "body": [
            {
                "type": "IfStatement",
                "test": {
                    "type": "BinaryExpression",
                    "operator": "<",
                    "left": {
                        "type": "Identifier",
                        "name": "X"
                    },
                    "right": {
                        "type": "MemberExpression",
                        "computed": true,
                        "object": {
                            "type": "Identifier",
                            "name": "V"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "mid"
                        }
                    }
                },
                "consequent": {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": {
                            "type": "Identifier",
                            "name": "high"
                        },
                        "right": {
                            "type": "BinaryExpression",
                            "operator": "-",
                            "left": {
                                "type": "Identifier",
                                "name": "mid"
                            },
                            "right": {
                                "type": "Literal",
                                "value": 1,
                                "raw": "1"
                            }
                        }
                    }
                },
                "alternate": {
                    "type": "IfStatement",
                    "test": {
                        "type": "BinaryExpression",
                        "operator": ">",
                        "left": {
                            "type": "Identifier",
                            "name": "X"
                        },
                        "right": {
                            "type": "MemberExpression",
                            "computed": true,
                            "object": {
                                "type": "Identifier",
                                "name": "V"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "mid"
                            }
                        }
                    },
                    "consequent": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "low"
                            },
                            "right": {
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                    "type": "Identifier",
                                    "name": "mid"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 1,
                                    "raw": "1"
                                }
                            }
                        }
                    },
                    "alternate": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "AssignmentExpression",
                            "operator": "=",
                            "left": {
                                "type": "Identifier",
                                "name": "low"
                            },
                            "right": {
                                "type": "BinaryExpression",
                                "operator": "+",
                                "left": {
                                    "type": "Identifier",
                                    "name": "mid"
                                },
                                "right": {
                                    "type": "Literal",
                                    "value": 2,
                                    "raw": "2"
                                }
                            }
                        }
                    }
                }
            }
        ],
        "sourceType": "script"
    }
    var infoTable = Parsing(elementTest.body);
    it('if statement type', () => {
        assert.equal(infoTable[0].Type, 'if statement');
    });
    it('if statement Name', () => {
        assert.equal(infoTable[0].Name, undefined);
    });
    it('if statement Line', () => {
        assert.equal(infoTable[0].Line, '1');
    });
    it('if statement Value', () => {
        assert.equal(infoTable[0].Value, undefined);
    });
    it('if statement Condition', () => {
        assert.equal(infoTable[0].Condition, 'X < V[mid]');
    });
    it('else if statement type', () => {
        assert.equal(infoTable[2].Type, 'else if statement');
    });
    it('else if statement Line', () => {
        assert.equal(infoTable[2].Line, '3');
    });
    it('if statement Value', () => {
        assert.equal(infoTable[2].Value, undefined);
    });
    it('else if statement Condition', () => {
        assert.equal(infoTable[2].Condition, 'X > V[mid]');
    });
    it('else statement type', () => {
        assert.equal(infoTable[4].Type, 'else statement');
    });
    it('else statement Name', () => {
        assert.equal(infoTable[4].Name, undefined);
    });
    it('else statement Line', () => {
        assert.equal(infoTable[4].Line, '5');
    });
    it('else statement Value', () => {
        assert.equal(infoTable[4].Value, undefined);
    });
    it('else statement type', () => {
        assert.equal(infoTable[5].Type, 'assignment expression');
    });
    it('else statement Name', () => {
        assert.equal(infoTable[5].Name, 'low');
    });
    it('else statement Line', () => {
        assert.equal(infoTable[5].Line, '5');
    });
    it('else statement Value', () => {
        assert.equal(infoTable[5].Value, 'mid + 2');
    });
});


describe('For Statement', () => {
    clear();
    var elementTest = parseCode('for(i=10-(n-5);i<100;i=i+1){}for(let i=0 ;i<100;i++){}for(i=n;i<=n+5;i=i+1){}for(let i=n-5 ;i<100;i++){}');
    var infoTable = Parsing(elementTest.body);
    it('For statement type', () => {
        assert.equal(infoTable[0].Type, 'for statement');
    });
    it('For statement Name', () => {
        assert.equal(infoTable[0].Name, undefined);
    });
    it('For statement Value', () => {
        assert.equal(infoTable[0].Value, undefined);
    });
    it('For statement Condition1', () => {
        assert.equal(infoTable[0].Condition, 'i = 10 - (n - 5) ; i < 100 ; i = i + 1');
    });
    it('For statement Condition2', () => {
        assert.equal(infoTable[1].Condition, 'i = 0 ; i < 100 ; i++');
    });
    it('For statement Condition3', () => {
        assert.equal(infoTable[2].Condition, 'i = n ; i <= (n + 5) ; i = i + 1');
    });
    it('For statement Condition4', () => {
        assert.equal(infoTable[3].Condition, 'i = n - 5 ; i < 100 ; i++');
    });
});

describe('Member Expression', () => {
    clear();
    var elementTest = parseCode('a[5]=10;a[n-4]=50;x=a[i++];x=a[++i];');
    var infoTable = Parsing(elementTest.body);
    it('Member Expression Name', () => {
        assert.equal(infoTable[0].Name, 'a[5]');
    });
    it('Member Expression Name', () => {
        assert.equal(infoTable[1].Name, 'a[n - 4]');
    });
    it('Member Expression Name', () => {
        assert.equal(infoTable[2].Value, 'a[i++]');
    });
    it('Member Expression Name', () => {
        assert.equal(infoTable[3].Value, 'a[++i]');
    });
});

describe('Boolean', () => {
    clear();
    var elementTest = parseCode('a=true;a=false; while(a){} if(!a){}');
    var infoTable = Parsing(elementTest.body);
    it('Name', () => {
        assert.equal(infoTable[0].Name, 'a');
    });
    it('Name', () => {
        assert.equal(infoTable[0].Value, true);
    });
    it('Name', () => {
        assert.equal(infoTable[1].Value, false);
    });
    it('Condition', () => {
        assert.equal(infoTable[2].Condition, 'a');
    });
    it('Condition', () => {
        assert.equal(infoTable[3].Condition, '!a');
    });
});


