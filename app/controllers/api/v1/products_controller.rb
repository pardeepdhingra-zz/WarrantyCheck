module Api
  module V1
    class ProductsController < Api::BaseController
      before_action :find_product, only: [:show, :update, :destroy]
      def index
        render json: current_user.products
      end

      def show
        render json: @product
      end

      def create
        render json: current_user.products.create(product_params)
      end

      def update
        render json: @product.update_attributes(product_params)
      end

      def destroy
        render json: @product.destroy
      end

      def search
      end

      private

      def find_product
        @product ||= current_user.products.find(params[:id])
      end

      def product_params
        params.require(:product).permit(:item_id, :name, :description, :product_type, :brand, :date_of_purchase, :warranty_expire_date)
      end
    end
  end
end
