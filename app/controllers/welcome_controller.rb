class WelcomeController < ApplicationController

	def index
	end

	def callback
		render layout: false
	end
	
end
