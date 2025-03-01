/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* @create/@delete tables */
CREATE TABLE test_create_table_A(
  colA    INT,
  colB    LONG INT,
  colC    TEXT
);

/* @recreate tables */
CREATE TABLE test_recreate_table_A(
  colA    INT,
  colB    LONG INT,
  colC    TEXT
) @recreate;

-- make a recreate-group with an FK dependency (legal)
CREATE TABLE g1(
  id INTEGER PRIMARY KEY,
  name TEXT
) @recreate(gr1);

CREATE TABLE use_g1(
  id INTEGER PRIMARY KEY REFERENCES g1(id),
  name2 TEXT
) @recreate(gr1);

-- we will migrate this table to create in version 1
CREATE TABLE test_this_table_will_become_create(
  xyzzy integer -- we'll change the table in a significant way
) @recreate;

-- extra items that will disappear when we switch to exclusive mode
CREATE VIEW extra_view AS SELECT * FROM g1;

CREATE INDEX extra_index ON g1(id);

CREATE TRIGGER extra_trigger BEFORE DELETE ON g1 BEGIN SELECT 1; END;

-- additional items that will not disappear even in exclusive mode
CREATE VIEW staying_view AS SELECT * FROM g1;

CREATE INDEX staying_index ON g1(id);

CREATE TRIGGER staying_trigger BEFORE DELETE ON g1 BEGIN SELECT 1; END;
