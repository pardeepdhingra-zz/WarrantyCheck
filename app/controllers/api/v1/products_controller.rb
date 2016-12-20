module Api
  module V1
    class ProductsController < Api::BaseController
      def index
        render json: Product.all
      end

      def show
        render json: Product.find(params[:id])
      end
    end
  end
end
