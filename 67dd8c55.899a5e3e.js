(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{105:function(e,t,r){"use strict";r.d(t,"a",(function(){return _})),r.d(t,"b",(function(){return b}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=o.a.createContext({}),u=function(e){var t=o.a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},_=function(e){var t=u(e.components);return o.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),_=u(r),f=n,b=_["".concat(l,".").concat(f)]||_[f]||d[f]||a;return r?o.a.createElement(b,s(s({ref:t},c),{},{components:r})):o.a.createElement(b,s({ref:t},c))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,l=new Array(a);l[0]=f;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:n,l[1]=s;for(var c=2;c<a;c++)l[c]=r[c];return o.a.createElement.apply(null,l)}return o.a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},73:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return l})),r.d(t,"metadata",(function(){return s})),r.d(t,"rightToc",(function(){return i})),r.d(t,"default",(function(){return u}));var n=r(2),o=r(6),a=(r(0),r(105)),l={id:"ch07",title:"Chapter 7: CQL Result Sets",sidebar_label:"Chapter 7: CQL Result Sets"},s={unversionedId:"ch07",id:"ch07",isDocsHomePage:!1,title:"Chapter 7: CQL Result Sets",description:"\x3c!---",source:"@site/../CQL_Guide/ch07.md",slug:"/ch07",permalink:"/cql-guide/ch07",version:"current",lastUpdatedBy:"Rico Mariani",lastUpdatedAt:1605243798,sidebar_label:"Chapter 7: CQL Result Sets",sidebar:"someSidebar",previous:{title:"Chapter 6: Calling Procedures Defined Elsewhere",permalink:"/cql-guide/ch06"},next:{title:"Chapter 8: Functions",permalink:"/cql-guide/ch08"}},i=[{value:"Results Sets From <code>OUT UNION</code>",id:"results-sets-from-out-union",children:[]}],c={rightToc:i};function u(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},c,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Most of this tutorial is about the CQL language itself but here we must diverge a bit.  The purpose of the\nresult set features of CQL is to create a C interface to SQLite data.  Because of this\nthere are a lot of essential details that require looking carefully at the generated C code.  Appendix 2\ncovers this code in even more detail but here it makes sense to at least talk about the interface."),Object(a.b)("p",null,"If we have this simple stored procedure:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sql"}),"create table foo(id integer not null, b bool, t text);\n\ncreate proc read_foo(id_ integer not null)\nbegin\n  select * from foo where id = id_;\nend;\n")),Object(a.b)("p",null,"We've created a simple data reader, this CQL code will cause the compiler to\ngenerated helper functions to read the data and materialize a result set.  "),Object(a.b)("p",null,"Let's look at the public interface of that result set now considering the most essential pieces."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-C"}),"/* this is almost everything in the generated header file */\n#define read_foo_data_types_count 3\ncql_result_set_type_decl(\n  read_foo_result_set, \\\n  read_foo_result_set_ref);\n\nextern cql_int32 read_foo_get_id(read_foo_result_set_ref\n  _Nonnull result_set, cql_int32 row);\nextern cql_bool read_foo_get_b_is_null(read_foo_result_set_ref \n  _Nonnull result_set, cql_int32 row);\nextern cql_bool read_foo_get_b_value(read_foo_result_set_ref \n  _Nonnull result_set, cql_int32 row);\nextern cql_string_ref _Nullable read_foo_get_t(\n   read_foo_result_set_ref  _Nonnull result_set, \n   cql_int32 row);\nextern cql_int32 read_foo_result_count(read_foo_result_set_ref \n  _Nonnull result_set);\nextern cql_code read_foo_fetch_results(sqlite3 *_Nonnull _db_, \n  read_foo_result_set_ref _Nullable *_Nonnull result_set, \n  cql_int32 id_);\n#define read_foo_row_hash(result_set, row) \\\n  cql_result_set_get_meta((cql_result_set_ref)(result_set))->\\\n  rowHash((cql_result_set_ref)(result_set), row)\n#define read_foo_row_equal(rs1, row1, rs2, row2) \\\ncql_result_set_get_meta((cql_result_set_ref)(rs1)) \\\n ->rowsEqual( \\\n   (cql_result_set_ref)(rs1),  row1,  \\\n   (cql_result_set_ref)(rs2),  row2)\n")),Object(a.b)("p",null,"Let's consider some of these individually now"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-C"}),"cql_result_set_type_decl(\n  read_foo_result_set, \n  read_foo_result_set_ref);\n")),Object(a.b)("p",null,"This declares the data type for ",Object(a.b)("inlineCode",{parentName:"p"},"read_foo_result_set")," and the associated object reference ",Object(a.b)("inlineCode",{parentName:"p"},"read_foo_result_set_ref"),".",Object(a.b)("br",{parentName:"p"}),"\n","As it turns out the underlying data type for all result sets is the same, only the shape of the data varies."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-C"}),"extern cql_code read_foo_fetch_results(sqlite3 *_Nonnull _db_, \n  read_foo_result_set_ref _Nullable *_Nonnull result_set, \n  cql_int32 id_);\n")),Object(a.b)("p",null,"The result set fetcher method gives you a ",Object(a.b)("inlineCode",{parentName:"p"},"read_foo_result_set_ref")," if it succeeds.  It accepts the ",Object(a.b)("inlineCode",{parentName:"p"},"id_")," argument which it\nwill internally pass along to ",Object(a.b)("inlineCode",{parentName:"p"},"read_foo(...)"),".  The latter function provides a ",Object(a.b)("inlineCode",{parentName:"p"},"sqlite3_stmt*")," which can then be iterated in the fetcher.\nThis method is the main public entry point for result sets."),Object(a.b)("p",null,"Once you have a result set, you can read values out of it."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-C"}),"extern cql_int32 read_foo_result_count(read_foo_result_set_ref \n  _Nonnull result_set);\n")),Object(a.b)("p",null,"That function tells you how many rows are in the result set.  "),Object(a.b)("p",null,"For each row you can use any of the row readers:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-C"}),"extern cql_int32 read_foo_get_id(read_foo_result_set_ref\n  _Nonnull result_set, cql_int32 row);\nextern cql_bool read_foo_get_b_is_null(read_foo_result_set_ref \n  _Nonnull result_set, cql_int32 row);\nextern cql_bool read_foo_get_b_value(read_foo_result_set_ref \n  _Nonnull result_set, cql_int32 row);\nextern cql_string_ref _Nullable read_foo_get_t(\n   read_foo_result_set_ref  _Nonnull result_set, \n   cql_int32 row);\n")),Object(a.b)("p",null,"These let you read the ",Object(a.b)("inlineCode",{parentName:"p"},"id")," of a particular row, and get a ",Object(a.b)("inlineCode",{parentName:"p"},"cql_int32")," or you can read the nullable boolean,\nusing the ",Object(a.b)("inlineCode",{parentName:"p"},"read_foo_get_b_is_null")," function first to see if the boolean is null and then ",Object(a.b)("inlineCode",{parentName:"p"},"read_foo_get_b_value"),"\nto get the value.  Finally the string can be accessed with ",Object(a.b)("inlineCode",{parentName:"p"},"read_foo_get_t"),".  As you can see there is a\nsimple naming convention for each of the field readers."),Object(a.b)("p",null,"Note:  The compiler has runtime arrays that control naming conventions as well as using CamelCasing.  Additional customizations may be created by adding new runtime arrays into the CQL compiler."),Object(a.b)("p",null,"Finally, also part of the public interface, are these macros:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-C"}),"#define read_foo_row_hash(result_set, row) \n#define read_foo_row_equal(rs1, row1, rs2, row2)\n")),Object(a.b)("p",null,"These use the CQL runtime to hash a row or compare two rows from identical result\nset types.  Metadata included in the result set allows general purpose code to work for\nevery result set.  Based on configuration, result set copying methods can also\nbe generated.   When you're done with a result set you can use the ",Object(a.b)("inlineCode",{parentName:"p"},"cql_release(...)"),"\nmethod to free the memory."),Object(a.b)("p",null,"Importantly, all of the rows from the query in the stored procedure are materialized\nimmediately and become part of the result set.  Potentially large amounts of memory can\nbe used if a lot of rows are generated."),Object(a.b)("p",null,"The code that actually creates the result set starting from the prepared statement is always the same.\nThe essential parts are:"),Object(a.b)("p",null,"First, a constant array that holds the data types for each column. "),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"uint8_t read_foo_data_types[read_foo_data_types_count] = {\n  CQL_DATA_TYPE_INT32 | CQL_DATA_TYPE_NOT_NULL, // id\n  CQL_DATA_TYPE_BOOL, // b\n  CQL_DATA_TYPE_STRING, // t\n};\n")),Object(a.b)("p",null,"All references are stored together at the end of the row, so we only need the count\nof references and the offset of the first one to do operations like ",Object(a.b)("inlineCode",{parentName:"p"},"cql_retain")," or ",Object(a.b)("inlineCode",{parentName:"p"},"cql_release"),"\non the row."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"#define read_foo_refs_offset cql_offsetof(read_foo_row, t) // count = 1\n")),Object(a.b)("p",null,"Lastly we need metadata to tell us count of columns and the offset of each column within the row."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"static cql_uint16 read_foo_col_offsets[] = { 3,\n  cql_offsetof(read_foo_row, id),\n  cql_offsetof(read_foo_row, b),\n  cql_offsetof(read_foo_row, t)\n};\n")),Object(a.b)("p",null,"Using the above we can now write this fetcher"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"CQL_WARN_UNUSED cql_code \nread_foo_fetch_results(\n  sqlite3 *_Nonnull _db_, \n  read_foo_result_set_ref _Nullable *_Nonnull result_set, \n  cql_int32 id_) \n{\n  sqlite3_stmt *stmt = NULL;\n  cql_profile_start(CRC_read_foo, &read_foo_perf_index);\n  \n  // we call the original procedure, it gives us a prepared statement\n  cql_code rc = read_foo(_db_, &stmt, id_);\n  \n  // this is everything you need to know to fetch the result\n  cql_fetch_info info = {\n    .rc = rc,\n    .db = _db_,\n    .stmt = stmt,\n    .data_types = read_foo_data_types,\n    .col_offsets = read_foo_col_offsets,\n    .refs_count = 1,\n    .refs_offset = read_foo_refs_offset,\n    .rowsize = sizeof(read_foo_row),\n    .crc = CRC_read_foo,\n    .perf_index = &read_foo_perf_index,\n  };\n  \n  // this function does all the work, it cleans up if .rc is an error code.\n  return cql_fetch_all_results(&info, (cql_result_set_ref *)result_set);\n}\n")),Object(a.b)("h3",{id:"results-sets-from-out-union"},"Results Sets From ",Object(a.b)("inlineCode",{parentName:"h3"},"OUT UNION")),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"out")," keyword was added for writing procedures that produce a single row result set.  With that, it became possible to make any single row result you wanted, assembling it from whatever sources you needed.  That is an important\ncase as single row results happen frequently and they are comparatively easy to create and pass around using C\nstructures for the backing store.  However, it's not everything, there are also cases where full flexibility is needed\nwhile producing a standard many-row result set.  For this we have ",Object(a.b)("inlineCode",{parentName:"p"},"out union")," which was dicussed fully in Chapter 5.  Here we'll discuss the code generation behind that."),Object(a.b)("p",null,"Here\u2019s an example from the CQL tests:"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-sql"}),'create proc some_integers(start integer not null, stop integer not null)\nbegin\n  declare C cursor like select 1 v, 2 v_squared, "xx" some_text;\n  declare i integer not null;\n  set i := start;\n  while (i < stop)\n  begin\n   fetch C(v, v_squared, junk) from values (i, i*i, printf("%d", i));\n   out union C;\n   set i := i + 1;\n end;\nend;\n')),Object(a.b)("p",null,"In this example the entire result set is made up out of thin air.  Of course any combination of this computation or data-access is possible, so you can ultimately make any rows you want in any order using SQLite to help you as much or as little as you need.  "),Object(a.b)("p",null,"Virtually all the code pieces to do this already exist for normal result sets.  The important parts of the output code look like this in your generated C."),Object(a.b)("p",null,"We need a buffer to hold the rows we are going to accumulate;  We use ",Object(a.b)("inlineCode",{parentName:"p"},"cql_bytebuf")," just like the normal fetcher above."),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{className:"language-C"}),"// This bit creates a growable buffer to hold the rows\n// This is how we do all the other result sets, too\ncql_bytebuf _rows_;\ncql_bytebuf_open(&_rows_);\n")),Object(a.b)("p",null,"We need to be able to copy the cursor into the buffer and retain any internal references"),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),'// This bit is what you get when you "out union" a cursor "C"\n// first we +1 any references in the cursor then we copy its bits \ncql_retain_row(C_);   // a no-op if there is no row in the cursor\nif (C_._has_row_) cql_bytebuf_append(&_rows_, (const void *)&C_, sizeof(C_));\n')),Object(a.b)("p",null,"Finally, we make the rowset when the procedure exits. If the procedure is returning with no errors the result set is created, otherwise the buffer is released.  The global ",Object(a.b)("inlineCode",{parentName:"p"},"some_integers_info")," has constants that describe the shape produced by this procedure just like the other cases that produce a result set. "),Object(a.b)("pre",null,Object(a.b)("code",Object(n.a)({parentName:"pre"},{}),"cql_results_from_data(_rc_, \n                      &_rows_, \n                      &some_integers_info, \n                      (cql_result_set_ref *)_result_set_);\n")),Object(a.b)("p",null,"The operations here are basically the same ones that will happen inside of the standard helper\n",Object(a.b)("inlineCode",{parentName:"p"},"cql_fetch_all_results"),", the difference is of course that you write the loop manually and therefore have\nfull control of the rows as they go in to the result set."),Object(a.b)("p",null,"In short, the overhead is pretty low.  What you\u2019re left with is pretty much the base cost of your algorithm.  The cost here is very similar to what it would be for any other thing that make rows."),Object(a.b)("p",null,"Of course, if you make a million rows, well, that would burn a lot of memory."))}u.isMDXComponent=!0}}]);