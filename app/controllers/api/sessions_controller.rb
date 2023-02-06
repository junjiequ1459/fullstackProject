class Api::SessionsController < ApplicationController
  before_action :require_logged_in, only: [:create]
  before_action :require_logged_in, only: [:destroy]

  def show
    @user = current_user
    if @user
      debugger
      render "api/users/show"
    else
      render json: { user: nil }
    end
  end

  def create
    username = params[:username]
    password = params[:password]
    @user = User.find_by_credentials(username, password)
    if @user
      login(@user)
      render "api/users/show"
    else
      render json: { errors: ["Invalid credentials"] }, status: 422
    end
  end

  def destroy
    if current_user
      logout!
    end
    render json: { message: "success" }
  end
end
