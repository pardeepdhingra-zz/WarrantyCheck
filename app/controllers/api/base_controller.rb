class BaseController < ApplicationController
  before_action :authenticate_user!
  prepend_before_action :get_auth_token

  private

  def get_auth_token
    if auth_token = params[:auth_token].blank? && request.headers["X-AUTH-TOKEN"]
      params[:auth_token] = auth_token
    end
  end
end
