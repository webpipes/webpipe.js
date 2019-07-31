
FS = require "fs"
PATH = require "path"
URL = require "url"
HTTP = require "http"

WEBPIPE = require "../"

config_path = PATH.join process.env[if process.platform is 'win32' then 'USERPROFILE' else 'HOME'], ".webpipe"

usage = ->
  console.log """
    Usage: webpipe COMMAND [command-specific-options]

      webpipe URL [--INPUT VALUE ...]
      webpipe NAME [--INPUT VALUE ...]
      webpipe alias NAME URL
      webpipe aliases
      webpipe help (NAME|URL)

  """
  process.exit 1

read_config = ->
  JSON.parse try FS.readFileSync config_path, "utf-8" catch err then "{}"

write_config = (config) ->
  FS.writeFileSync config_path, JSON.stringify(config, null, 2), "utf-8"

get_block_url = (action) ->
  alias = read_config().aliases?[action]
  url = alias or action
  parsed = URL.parse url
  if parsed.host? then url else null

exports.run = ->
  args = process.argv[2..]
  usage() if args.length < 1
  action = args.shift()
  if actions[action]
    actions[action] args
  else
    args.unshift action
    actions.execute args

actions =

  alias: (args) ->
    usage() if args.length isnt 2
    config = read_config()
    config.aliases = {} unless config.aliases?
    config.aliases[args[0]] = args[1]
    write_config config

  aliases: ->
    for name, url of read_config().aliases
      console.log "#{name}: #{url}"

  execute: (args) ->
    usage() if args.length is 0
    action = args.shift()
    url = get_block_url action
    usage() unless url?

    options = parse_execute_args args

    WEBPIPE.execute url, options.inputs, (err, response) ->
      if err
        console.warn err
        process.exit 1
      else
        console.log response
        process.exit 0

  help: (args) ->
    usage() if args.length is 0
    action = args.shift()
    url = get_block_url action
    usage() unless url

    WEBPIPE.options url, (err, meta) ->
      if err
        console.warn err
        process.exit 1
      else
        console.log meta
        process.exit 0

parse_execute_args = (args) ->
  options =
    inputs: {}
  try
    while args.length
      match = args.shift().match(/^--(\w+)=?(.*)$/)
      name = match[1]
      if match[2]
        options.inputs[name] = match[2]
      else if args.length > 0
        options.inputs[name] = args.shift()
      else
        throw null
      if file = options.inputs[name].match(/^@(.*)$/)?[1]
        file = "/dev/stdin" if file is "-"
        options.inputs[name] = FS.readFileSync file, "utf-8"
  catch err
    console.warn err
    usage()
  options
