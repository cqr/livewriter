APP_ROOT = File.expand_path(File.join(File.dirname(__FILE__), '..'))

require 'rubygems'
require 'sinatra'
require 'haml'

class LiveWriter < Sinatra::Application
  
  set :root, APP_ROOT  
  
  helpers do
    def javascript_tag(file)
      "<script type='text/javascript' src='/js/#{file.to_s}.js'></script>"
    end
    
    def stylesheet_tag(file)
      "<link rel='stylesheet' type='text/css' href='/css/#{file.to_s}.css' />"
    end
  end

  get '/' do
    haml :index
  end

  get '/home' do
    haml "abcdeg"
  end

end

