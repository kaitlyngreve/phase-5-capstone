class User < ApplicationRecord
    has_many :recipes
    has_many :cuisines, through: :recipes
    has_many :likes

    has_secure_password
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true, length: { minimum: 6 }
end
