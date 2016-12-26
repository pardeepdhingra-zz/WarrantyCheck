Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/user'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :products
      resources :categories, only: [:index]
      get 'search' => 'products#search'
    end
  end
end
