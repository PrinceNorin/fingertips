class StaticController < ApplicationController
  def home
    render file: 'public/index.html'
  end
end
