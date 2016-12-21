class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session

  rescue_from ActiveRecord::RecordNotFound do |exception|
    render json: {error: exception.message}, status: 404
  end

  rescue_from ActiveRecord::ActiveRecordError do |exception|
    render json: {error: exception.message}, status: 422
  end

  rescue_from ActionController::RoutingError do |exception|
    render json: {error: exception.message}, status: 500
  end

  rescue_from StandardError do |exception|
    render json: {error: exception.message}, status: 500
  end
end
