---
title: 'SQL Basics'
metaTitle: 'SQL Basics'
metaDescription: 'Topics in Databases'
---

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
  integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
  crossOrigin="anonymous"
/>

For more information on SQL syntax, click [here](../web_programming/1_sql.mdx).

# SQL Parts

- SQL DDL: defining, deleting and modifying relation schemas
- SQL DML: query information from, insert tuples into, delete tuples from and modify tuples in the database
- integrity: SQL DDL includes commands for specifying integrity constraints
- View definition: SQL DDL includes commands for defining views
- Transaction control: SQL commands for specifying the beginning and ending of transactions
- Embedded SQL and dynamic SQL: define how SQL statements can be embedded within general-purpose programming languages
- Authorization: SQL DDL includes commands for specifying access rights to relations and views

# Data Definition Language

The SQL data-definition language (DDL) allows the specification of relations and information about relations, including:

- the schema for each relation
- the type of values associated with each attribute
- the integrity constraints
- the set of indices to be maintained for each relation
- security and authorization information for each relation
- the physical storage structure of each relation on disk
