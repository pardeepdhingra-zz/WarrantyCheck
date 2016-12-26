module Api
  module V1
    class BrandsController < ApplicationController
      before_action :find_category, only: [:index]

      def index
        render json: category.brands
      end

      private
      def find_category
        Category.find(params[:category_id])
      end
    end
  end
end
