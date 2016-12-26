class Category < ActiveRecord::Base
  has_many :products
  has_and_belongs_to_many :brands
end
