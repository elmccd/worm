#!/usr/bin/env bash
eb create my-beanstalk-wormer \
  --single \
  --region "$1" \
  --cname my-cache-warmer \
  --instance_type t2.nano
