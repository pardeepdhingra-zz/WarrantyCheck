class Product < ActiveRecord::Base
  validates :name, presence: true
  belongs_to :owner, foreign_key: :owner_id
end
