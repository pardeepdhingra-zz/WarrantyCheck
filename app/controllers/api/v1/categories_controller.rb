module Api
  module V1
    class CategoriesController < ApplicationController
      def index
        render json: Category.all
      end
    end
  end
end
