module Api
  module V1
    class ProductsController < Api::BaseController
      def index
        render json: Project.all
      end
    end
  end
end
