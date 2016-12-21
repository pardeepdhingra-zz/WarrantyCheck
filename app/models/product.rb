class Product < ActiveRecord::Base
  acts_as_paranoid

  validates :item_id, :name, presence: true
  belongs_to :owner, foreign_key: :owner_id
end
