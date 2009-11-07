require 'sinatra'
require 'rack/test'

Livewriter.set(
  :environment => :test,
  :run => false,
  :raise_errors => true,
  :logging => false
)

require File.join(File.dirname(__FILE__), '..', 'lib', 'livewriter.rb')

module TestHelper
  
  def app
    # change to your app class if using the 'classy' style
    Sinatra::Application.new
  end
  
  def body
    last_response.body
  end
  
  def status
    last_response.status
  end
  
  include Rack::Test::Methods

end

require 'bacon'

Bacon::Context.send(:include, TestHelper)
