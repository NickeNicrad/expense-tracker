'use client'

import PromptCardList from "./lists/AccountsList"

function Profile({name, desc, data, handleEdit, handleDelete}) {

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <PromptCardList data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
    </section>
  )
}

export default Profile