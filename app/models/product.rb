class Product < ActiveRecord::Base
  acts_as_paranoid
  default_scope { order(warranty_expire_date: :asc)}

  validates :item_id, :name, presence: true
  validates :item_id, uniqueness: true, null: false
  belongs_to :owner, foreign_key: :owner_id
end
