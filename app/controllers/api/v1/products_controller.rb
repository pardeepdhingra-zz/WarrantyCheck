module Api
  module V1
    class ProductsController < Api::BaseController
      before_action :find_product, only: [:show, :update, :destroy]

      def index
        render json: current_user.products.paginate(page: params[:page], per_page: params[:per_page])
      end

      def show
        render json: @product
      end

      def create
        render json: current_user.products.create!(product_params)
      end

      def update
        @product.update_attributes(product_params)
        render json: @product
      end

      def destroy
        render json: @product.destroy
      end

      def search
        if params[:term].present? && !params[:term].blank?
          render json: Product.search(params[:term])
        elsif params[:barcode].present?  && !params[:barcode].blank?
          render json: Product.search_by_barcode(params[:barcode])
        end
      end

      private

      def find_product
        @product ||= current_user.products.find(params[:id])
      end

      def product_params
        params.require(:product).permit(:barcode, :name, :description, :warranty_type, :brand_id, :purchase_date, :warranty_expire_date, :category_id, :seller_name, :tin_number, :invoice)
      end
    end
  end
end
