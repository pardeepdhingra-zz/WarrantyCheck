class Product < ActiveRecord::Base
  acts_as_paranoid
  default_scope { order(warranty_expire_date: :asc)}

  validates :item_id, :name, presence: true
  validates :item_id, uniqueness: true, null: false
  belongs_to :owner, foreign_key: :owner_id

  def self.search(term)
    wild_card_term = "%#{term}%"
    where("name ilike :search_term
      or description ilike :search_term
      or item_id ilike :search_term
      or brand ilike :search_term
      or product_type ilike :search_term",
      search_term: wild_card_term)
  end

  def self.search_by_item_id(item_id)
    where("item_id ilike ? ", item_id)
  end
end
