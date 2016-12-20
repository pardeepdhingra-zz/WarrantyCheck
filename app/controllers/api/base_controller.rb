class Api::BaseController < ApplicationController
  before_action :authenticate_user!
  prepend_before_action :get_auth_token

  private

  def get_auth_token
    params['access-token'] ||= request.headers['access-token']
    params['uid']  ||= request.headers['uid']
    params['client'] ||= request.headers['client']
  end
end
