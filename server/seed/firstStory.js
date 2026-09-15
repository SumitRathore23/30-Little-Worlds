require("dotenv").config();

const connectDB = require("../config/db");
const Story = require("../models/Story");

const firstStory = {
  title: "Sparrow and the Eagle",

  slug: "sparrow-and-the-eagle",

  excerpt:
    "A story about a love that wanted forever, but was only meant to teach.",

  theme: "Love",

  readingTime: 7,

  coverImage: "",

  featured: true,

  published: true,

  content: `Once, high above the noise of the world, there lived an Eagle. He was not the kind of bird who belonged to cages. He had always believed that love meant freedom, loyalty, and choosing the same person—even on the days when choosing them was difficult.

Then one day, he met a Sparrow.

She was small, gentle, and completely different from him. The Eagle lived among the clouds. The Sparrow belonged to the little corners of the sky. Yet somehow, when they met, the distance between their worlds disappeared.

They started as strangers. Then conversations became smiles. Smiles became waiting. Waiting became looking for each other. And before either of them realized it, the Eagle had started looking for the Sparrow in every corner of the sky.

They began meeting almost every day. The Eagle loved those little moments more than he ever admitted. Two hours together could make an entire day feel worth living. He didn't need grand promises. He just needed her beside him.

Then came a day that felt different. They went to a sacred place where countless birds came to ask the heavens for blessings. The Eagle and the Sparrow stood there together.

And by a strange twist of fate, a flower garland found its way into the Eagle's hands.

He placed it around the Sparrow. They laughed. But somewhere inside the Eagle, something became serious. For him, that moment wasn't just a coincidence.

He looked at her and thought, "Maybe this is my person." And the Sparrow smiled as if she believed it too.

They began imagining a future. Not a perfect future. Just one where they were still together.

The Eagle started building that future in his heart long before it existed in the real world.

He loved the Sparrow with the kind of love that doesn't ask, "What will I get in return?" It simply says, "I'm here."

But love has a cruel habit. Sometimes one heart keeps arriving at the same door while the other has already started walking away.

Slowly, the Sparrow changed. The calls became shorter. The conversations became colder.

The little things that once mattered began disappearing.

The Eagle noticed every change. Because when you truly love someone, you notice the smallest distance. He asked. He worried. He overthought. He tried to hold on tighter. And the tighter he held, the farther the Sparrow seemed to fly.

She told him she wanted distance. She said that what they had was attachment. She said her heart could no longer give him the same love.

The Eagle heard every word. But his heart refused to understand them. Because how could something that had felt so real suddenly become something that wasn't?

He pleaded. Not because he was weak. But because he wasn't ready to lose the person he had already placed inside his future. He would have waited. He would have changed. He would have fought every storm. He would have stayed.

But you cannot fight a battle when the person you are fighting for has already left the battlefield. And that was the cruelest lesson the Eagle had to learn.

The Sparrow still smiled. She still posted songs about love. She still looked like someone waiting for romance. And the Eagle watched from a distance, wondering how someone could look so full of love—and still have none left for him.

That question broke something inside him.

For the first time, the Eagle understood that love doesn't always end because someone stops caring. Sometimes it ends because two people no longer feel the same thing. And there is no argument strong enough to change a heart that has already chosen another direction.

The Eagle wanted to hate her. He tried. But every time he remembered her smile, hatred disappeared.

So he did something harder. He decided to let her go.

Not because his love had disappeared. But because loving someone sometimes means refusing to become the reason they feel trapped.

He didn't want to stand between the Sparrow and the person her heart still remembered.

So the Eagle stepped back. Silently. No revenge. No curses. No attempt to destroy what she might find after him. Just silence—the kind of silence that contains thousands of things left unsaid.

And perhaps that was the greatest proof of his love.

Because the Eagle could have said, "After everything I did for you, how could you leave me?"

Instead, he whispered to himself, "If your happiness is somewhere I cannot be, then maybe I have to learn to love you from far away."

That night, the Eagle flew higher than he ever had before.

Not because he had stopped hurting. He was hurting more than ever.

But because he finally understood something.

He had spent so long trying to become enough for someone else that he had forgotten who he was.

The Eagle looked down at the world beneath him. The Sparrow was still somewhere in that enormous sky.

But for the first time, he didn't chase her. He simply watched her fly.

And somewhere between heartbreak and acceptance, the Eagle became himself again.

He still remembered her. He still loved the memories. He still remembered the day they stood together beneath the same sky. He still remembered the flower garland. He still remembered the promises they once imagined.

But memories were no longer chains. They became scars.

And scars don't mean you are broken. They mean you survived.

Perhaps someday, the Sparrow would look back at the sky and remember the Eagle. Perhaps one day she would understand how deeply he had loved her. Perhaps she would realize that the Eagle wasn't asking for perfection.

He was only asking for one thing—to be chosen with the same certainty with which he had chosen her.

But whether she realized it or not no longer mattered.

Because the Eagle had finally learned that love should never require you to abandon yourself.

So he flew on.

Not toward another Sparrow. Not toward revenge. Not toward the past.

He flew toward the person he was always meant to become.

And somewhere far behind him, a little Sparrow continued her journey too.

Their paths had crossed. Their hearts had touched. Their story had been beautiful.

It simply wasn't forever.

And maybe that is what made it so painful.

Because some love stories aren't written to last a lifetime. Some are written to change a lifetime.

The Eagle loved the Sparrow. The Sparrow loved the Eagle—once, perhaps, in her own way. And for a little while, they were each other's whole sky.

Until one day, the Sparrow chose another direction.

And the Eagle learned to fly without chasing her.

Because sometimes the greatest act of love isn't holding on.

It's letting go without becoming bitter.

And sometimes, the one who breaks your heart isn't the villain of your story. They're simply the chapter that taught you how to become the person you were always meant to be.

Thankuuu so much for reading. I hope youu like it.`
};

const addFirstStory = async () => {
  try {
    await connectDB();

    const existingStory = await Story.findOne({
      slug: firstStory.slug
    });

    if (existingStory) {
      console.log("Sparrow and the Eagle already exists.");
      process.exit(0);
    }

    await Story.create(firstStory);

    console.log("====================================");
    console.log("First story added successfully!");
    console.log("Title: Sparrow and the Eagle");
    console.log("Author: Dipanshu Thakur");
    console.log("Theme: Love");
    console.log("Status: Published");
    console.log("Featured: Yes");
    console.log("====================================");

    process.exit(0);
  } catch (error) {
    console.error("Failed to add first story:");
    console.error(error.message);
    process.exit(1);
  }
};

addFirstStory();