#!/bin/bash
# Copyright (c) Meta Platforms, Inc. and affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

OUT_DIR="out"

coverage() {
  if ! ./test.sh --coverage
  then
    echo "you can't run coverage until the tests all pass"
    return 1
  fi

  echo generating ${OUT_DIR}/report.html
  if ! "$@" \
            --html \
            --html-details \
            -o ${OUT_DIR}/report.html \
            -e test \
            -e tester \
            -e linetester \
            -e json_test \
            -e out \
            -e cql.c \
            -e cql.y.c \
            -e cqltest.c \
            -e result_set_extension.c \
            -e run_test_client.c \
            -e query_plan_test.c \
            -e run_test.c \
            -e generated_upgrade \
            -e upgrade
  then
    echo "error generating html"
    return 1
  fi

  echo generating ${OUT_DIR}/report.txt
  if ! "$@" \
              -o ${OUT_DIR}/report.txt \
              -e test \
              -e tester \
              -e linetester \
              -e json_test \
              -e out \
              -e cql.c \
              -e cql.y.c \
              -e cqltest.c \
              -e result_set_extension.c \
              -e run_test_client.c \
              -e query_plan_test.c \
              -e run_test.c \
              -e generated_upgrade \
              -e upgrade
  then
    echo "error generating plain text"
    return 1
  fi

  return 0
}
