# To use with thin 
#  thin start -p PORT -R config.ru

require File.join(File.dirname(__FILE__), 'lib', 'livewriter.rb')

disable :run
set :environment, :production
run LiveWriter
