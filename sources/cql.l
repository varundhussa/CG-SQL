%option noyywrap nodefault yylineno case-insensitive never-interactive
%{

/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// In case there is any doubt, 'cql.l' is included in the license as well as
// the code flex generates from it.

#include "cql.y.h"
#include <stdarg.h>
#include <string.h>
#include <stdio.h>
#include <cql.h>
#include <charbuf.h>
#include <encoders.h>

void yyerror(const char *s, ...);
void line_directive(const char *);
char *Strdup(const char *);
int fileno(FILE *);
static CSTR last_doc_comment = NULL;

// the lexer has unused functions and implicit conversions, not easily removed
#pragma clang diagnostic ignored "-Wunused-function"
#pragma clang diagnostic ignored "-Wconversion"

cql_noexport CSTR get_last_doc_comment() {
  CSTR result = last_doc_comment;
  last_doc_comment = NULL;
  return result;
}

%}

stop [^A-Z_0-9]
sp [ \t]+
hex [0-9A-F]
d [0-9]

%%

EXCLUDE{sp}NO{sp}OTHERS/{stop}   { return EXCLUDE_NO_OTHERS; }
EXCLUDE{sp}CURRENT{sp}ROW/{stop} { return EXCLUDE_CURRENT_ROW; }
EXCLUDE{sp}GROUP/{stop}          { return EXCLUDE_GROUP; }
EXCLUDE{sp}TIES/{stop}           { return EXCLUDE_TIES; }

CURRENT{sp}ROW/{stop}        { return CURRENT_ROW; }
UNBOUNDED                    { return UNBOUNDED; }
PRECEDING                    { return PRECEDING; }
FOLLOWING                    { return FOLLOWING; }
SWITCH                       { return SWITCH; }
RANGE                        { return RANGE; }
ENUM                         { return ENUM; }
ROWS                         { return ROWS; }
GROUPS                       { return GROUPS; }
PARTITION                    { return PARTITION; }
FILTER                       { return FILTER; }
WINDOW                       { return WINDOW; }
EXPLAIN                      { return EXPLAIN; }
QUERY{sp}PLAN/{stop}         { return QUERY_PLAN; }
SELECT                       { return SELECT; }
CAST                         { return CAST; }
CREATE                       { return CREATE; }
DROP                         { return DROP; }
TABLE                        { return TABLE; }
TEMP                         { return TEMP; }
COLLATE                      { return COLLATE; }
HIDDEN                       { return HIDDEN; }
PRIMARY                      { return PRIMARY; }
KEY                          { return KEY; }
IF                           { return IF; }
WHILE                        { return WHILE; }
CALL                         { return CALL; }
EXISTS                       { return EXISTS; }
UNION                        { return UNION; }
UNION{sp}ALL/{stop}          { return UNION_ALL; }
INTERSECT                    { return INTERSECT; }
EXCEPT                       { return EXCEPT; }
NOT                          { return NOT; }
NULL                         { return NULL_; }
TRUE                         { return TRUE_; }
FALSE                        { return FALSE_; }
DEFAULT                      { return DEFAULT; }
CHECK                        { return CHECK; }
LET                          { return LET; }
LONG                         { return LONG_; }
LONG_INTEGER                 { return LONG_INTEGER; }
LONG_INT                     { return LONG_INT; }
INT                          { return INT_; }
INTEGER                      { return INTEGER; }
TEXT                         { return TEXT; }
VIRTUAL                      { return VIRTUAL; }
WITH                         { return WITH; }
RECURSIVE                    { return RECURSIVE; }
WITHOUT                      { return WITHOUT; }
ROWID                        { return ROWID; }
AUTOINCREMENT                { return AUTOINCREMENT; }
BOOL                         { return BOOL_; }
REFERENCES                   { return REFERENCES; }
FOREIGN                      { return FOREIGN; }
REAL                         { return REAL; }
CASCADE                      { return CASCADE; }
ON                           { return ON; }
ON{sp}CONFLICT/{stop}        { return ON_CONFLICT; }
DO                           { return DO; }
NOTHING                      { return NOTHING; }
UPDATE                       { return UPDATE; }
DELETE                       { return DELETE; }
CONST                        { return CONST; }
CONSTRAINT                   { return CONSTRAINT; }
UNIQUE                       { return UNIQUE; }
PRIVATE                      { return PRIVATE; }
INDEX                        { return INDEX; }
ALL                          { return ALL; }
AS                           { return AS; }
BY                           { return BY; }
DISTINCT                     { return DISTINCT; }
DISTINCTROW                  { return DISTINCTROW; }
INNER                        { return INNER; }
OUTER                        { return OUTER; }
CROSS                        { return CROSS; }
USING                        { return USING; }
RIGHT                        { return RIGHT; }
FROM                         { return FROM; }
WHERE                        { return WHERE; }
GROUP                        { return GROUP; }
HAVING                       { return HAVING; }
ASC                          { return ASC; }
DESC                         { return DESC; }
LEFT                         { return LEFT; }
JOIN                         { return JOIN; }
SET                          { return SET; }
OVER                         { return OVER; }
"<<"                         { return LS; }
">>"                         { return RS; }
"<>"                         { return NE; }
"!="                         { return NE_; }
">="                         { return GE; }
"<="                         { return LE; }
":="                         { return ASSIGN; }
"=="                         { return EQEQ; }
"||"                         { return CONCAT; }
IS{sp}NOT{sp}FALSE/{stop}    { return IS_NOT_FALSE; }
IS{sp}NOT{sp}TRUE/{stop}     { return IS_NOT_TRUE; }
IS{sp}FALSE/{stop}           { return IS_FALSE; }
IS{sp}TRUE/{stop}            { return IS_TRUE; }
IS{sp}NOT/{stop}             { return IS_NOT; }
ISNULL                       { return ISNULL; }
NOTNULL                      { return NOTNULL; }
IS                           { return IS; }
AND                          { return AND; }
ORDER                        { return ORDER; }
CASE                         { return CASE; }
END                          { return END; }
WHEN                         { return WHEN; }
ELSE                         { return ELSE; }
THEN                         { return THEN; }
VIEW                         { return VIEW; }
INSERT                       { return INSERT; }
INTO                         { return INTO; }
VALUES                       { return VALUES; }
OR                           { return OR; }
LIMIT                        { return LIMIT; }
OFFSET                       { return OFFSET; }
PROC                         { return PROC; }
@PROC                        { return AT_PROC; }
@RC                          { return AT_RC; }
PROCEDURE                    { return PROCEDURE; }
FUNCTION                     { return FUNCTION; }
FUNC                         { return FUNC; }
BEGIN                        { return BEGIN_; }
IN                           { return IN; }
NOT{sp}IN/{stop}             { return NOT_IN; }
TO                           { return TO; }
FOR                          { return FOR; }
THROW                        { return THROW; }
TRY                          { return TRY; }
CATCH                        { return CATCH; }
NOT{sp}LIKE/{stop}           { return NOT_LIKE; }
LIKE                         { return LIKE; }
NOT{sp}MATCH/{stop}          { return NOT_MATCH; }
MATCH                        { return MATCH; }
NOT{sp}REGEXP/{stop}         { return NOT_REGEXP; }
REGEXP                       { return REGEXP; }
NOT{sp}GLOB/{stop}           { return NOT_GLOB; }
GLOB                         { return GLOB; }
NOT{sp}BETWEEN/{stop}        { return NOT_BETWEEN; }
BETWEEN                      { return BETWEEN; }
OUT                          { return OUT; }
INOUT                        { return INOUT; }
CURSOR                       { return CURSOR; }
DECLARE                      { return DECLARE; }
FETCH                        { return FETCH; }
LOOP                         { return LOOP; }
LEAVE                        { return LEAVE; }
CONTINUE                     { return CONTINUE; }
OPEN                         { return OPEN; }
CLOSE                        { return CLOSE; }
ELSE{sp}IF/{stop}            { return ELSE_IF; }
SAVEPOINT                    { return SAVEPOINT; }
ROLLBACK                     { return ROLLBACK; }
RAISE                        { return RAISE; }
FAIL                         { return FAIL; }
ABORT                        { return ABORT; }
COMMIT                       { return COMMIT; }
TRANSACTION                  { return TRANSACTION; }
RELEASE                      { return RELEASE; }
REPLACE                      { return REPLACE; }
IGNORE                       { return IGNORE; }
OBJECT                       { return OBJECT; }
BLOB                         { return BLOB; }
UPSERT                       { return UPSERT; }
STATEMENT                    { return STATEMENT; }
TYPE                         { return TYPE; }
@ENFORCE_RESET               { return AT_ENFORCE_RESET; }
@ENFORCE_PUSH                { return AT_ENFORCE_PUSH; }
@ENFORCE_POP                 { return AT_ENFORCE_POP; }
@ENFORCE_STRICT              { return AT_ENFORCE_STRICT; }
@ENFORCE_NORMAL              { return AT_ENFORCE_NORMAL; }
@SENSITIVE                   { return AT_SENSITIVE; }
@DECLARE_SCHEMA_REGION       { return AT_DECLARE_SCHEMA_REGION; }
@DECLARE_DEPLOYABLE_REGION   { return AT_DECLARE_DEPLOYABLE_REGION; }
@BEGIN_SCHEMA_REGION         { return AT_BEGIN_SCHEMA_REGION; }
@END_SCHEMA_REGION           { return AT_END_SCHEMA_REGION; }
@SCHEMA_AD_HOC_MIGRATION     { return AT_SCHEMA_AD_HOC_MIGRATION; }
@ECHO                        { return AT_ECHO; }
@RECREATE                    { return AT_RECREATE; }
@CREATE                      { return AT_CREATE; }
@DELETE                      { return AT_DELETE; }
@SCHEMA_UPGRADE_VERSION      { return AT_SCHEMA_UPGRADE_VERSION; }
@PREVIOUS_SCHEMA             { return AT_PREVIOUS_SCHEMA; }
@SCHEMA_UPGRADE_SCRIPT       { return AT_SCHEMA_UPGRADE_SCRIPT; }
ALTER                        { return ALTER; }
RENAME                       { return RENAME; }
COLUMN                       { return COLUMN; }
ADD                          { return ADD; }
ARGUMENTS                    { return ARGUMENTS; }
RETURN                       { return RETURN; }
@DUMMY_NULLABLES             { return AT_DUMMY_NULLABLES; }
@DUMMY_DEFAULTS              { return AT_DUMMY_DEFAULTS; }
@DUMMY_SEED                  { return AT_DUMMY_SEED; }
@FILE                        { return AT_FILE; }
@ATTRIBUTE                   { return AT_ATTRIBUTE; }
@EMIT_ENUMS                  { return AT_EMIT_ENUMS; }
@EMIT_CONSTANTS              { return AT_EMIT_CONSTANTS; }
DEFERRED                     { return DEFERRED; }
DEFERRABLE                   { return DEFERRABLE; }
NOT{sp}DEFERRABLE/{stop}     { return NOT_DEFERRABLE; }
IMMEDIATE                    { return IMMEDIATE; }
EXCLUSIVE                    { return EXCLUSIVE; }
RESTRICT                     { return RESTRICT; }
ACTION                       { return ACTION; }
INITIALLY                    { return INITIALLY; }
NO                           { return NO; }
BEFORE                       { return BEFORE; }
AFTER                        { return AFTER; }
INSTEAD                      { return INSTEAD; }
OF                           { return OF; }
TRIGGER                      { return TRIGGER; }
FOR{sp}EACH{sp}ROW/{stop}    { return FOR_EACH_ROW; }
ENCODE                       { return ENCODE; }
CONTEXT{sp}COLUMN/{stop}     { return CONTEXT_COLUMN; }
CONTEXT{sp}TYPE/{stop}       { return CONTEXT_TYPE; }

0x{hex}+                     { char *s = Strdup(yytext); yylval.sval = s; return strtoll(s+2, NULL, 16) <= 0x7fffffff ? INTLIT: LONGLIT; }
0x{hex}+L                    { char *s = Strdup(yytext); s[strlen(s)-1] = 0; /* remove the L */ yylval.sval = s; return LONGLIT; }
{d}+                         { char *s = Strdup(yytext); yylval.sval = s; return atoll(s) <= 0x7fffffff ? INTLIT: LONGLIT; }
{d}+L                        { char *s = Strdup(yytext); s[strlen(s)-1] = 0; /* remove the L */ yylval.sval = s; return LONGLIT; }

({d}+"."{d}*|"."{d}+)(E("+"|"-")?{d}+)? { yylval.sval = Strdup(yytext); return REALLIT; }

\"(\\.|[^\\"\n])*\"          { yylval.sval = Strdup(yytext); return CSTRLIT; }
'(''|[^'\n])*'               { yylval.sval = Strdup(yytext); return STRLIT; }
X'({hex}{hex})*'             { yylval.sval = Strdup(yytext); return BLOBLIT; }
[-+&~|^/%*(),.;!<>:=]        { return yytext[0]; }
[_A-Z][A-Z0-9_]*             { yylval.sval = Strdup(yytext); return ID; }

[ \t\n]                      ;
\-\-.*                       ;

.                            { yyerror("Unexpected %s\n", yytext); }

^#\ {d}+\ \"[^"]*\".*        { line_directive(yytext); }
^\ *#line\ {d}+\ \"[^"]*\".* { line_directive(yytext); }

"/*"                         { // sqlite supports C style comments... ignore those
                               CHARBUF_OPEN(tmp);
                               int c1 = 0, c2 = input();
                               bool_t save_comment = false;
                               if (c2 == '!' || c2 == '*') {
                                 save_comment = true;
                                 bputc(&tmp, '/');
                                 bputc(&tmp, '*');
                               }
                               for (;;) {
                                 if (c2 == EOF) break;
                                 if (save_comment) {
                                   bputc(&tmp, c2);
                                 }
                                 if (c1 == '*' && c2 == '/') break;
                                 c1 = c2;
                                 c2 = input();
                               }
                               if (save_comment) {
                                 CHARBUF_OPEN(strlit);
                                 cg_encode_c_string_literal(tmp.ptr, &strlit);
                                 last_doc_comment = Strdup(strlit.ptr);
                                 CHARBUF_CLOSE(strlit);
                               }
                               CHARBUF_CLOSE(tmp);
                             }
