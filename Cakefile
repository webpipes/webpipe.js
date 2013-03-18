{exec, spawn} = require 'child_process'
{series}      = require 'async'
 
sh = (command) -> (k) ->
  console.log "Executing #{command}"
  exec command, (err, sout, serr) ->
    console.log err if err
    console.log sout if sout
    console.log serr if serr
    do k
 
task 'docs', 'rebuild documentation', ->
  series [
    (sh "docco src/*.coffee")
    (sh "git add docs/*")
    (sh "git commit -m 'updating documentation from master'")
  ]
