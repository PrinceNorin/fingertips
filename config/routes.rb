Rails.application.routes.draw do
  root 'static#home'
  get '*path' => 'static#home'
end
